export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  const config = useRuntimeConfig(event);
  const apiBase =
    (typeof config?.aiApiBase === "string" && config.aiApiBase.trim()) ||
    (typeof config?.public?.aiApiBase === "string" &&
      config.public.aiApiBase.trim()) ||
    "http://127.0.0.1:8000";

  const body = await readBody(event);
  const question = body?.question;

  if (!question || typeof question !== "string" || !question.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required field: question",
    });
  }

  // Enable debug logs with either:
  // - runtime config: aiStreamDebug / public.aiStreamDebug
  // - query param: ?debugStream=1
  const query = getQuery(event);
  const debugFromQuery = ["1", "true", "yes", "on"].includes(
    String(query?.debugStream ?? "").toLowerCase()
  );
  const debugFromConfig =
    Boolean(config?.aiStreamDebug) || Boolean(config?.public?.aiStreamDebug);
  const debugStream = debugFromQuery || debugFromConfig;

  const requestId = `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`.toUpperCase();

  const log = (...args) => {
    if (!debugStream) return;
    console.log(`[ai.stream.proxy][${requestId}]`, ...args);
  };

  const preview = (text, max = 160) => {
    const compact = String(text || "")
      .replace(/\s+/g, " ")
      .trim();
    return compact.length > max ? `${compact.slice(0, max)}…` : compact;
  };

  let upstream;
  try {
    log("incoming request", {
      apiBase,
      questionLength: question.trim().length,
      method: event.node.req.method,
      url: event.node.req.url,
    });

    upstream = await fetch(`${apiBase}/ask/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ question: question.trim() }),
    });
  } catch (err) {
    log("failed to reach upstream", {
      message: err?.message || String(err),
    });
    throw createError({
      statusCode: 502,
      statusMessage: `Unable to reach local AI API at ${apiBase}`,
    });
  }

  log("upstream connected", {
    status: upstream.status,
    contentType: upstream.headers.get("content-type") || null,
    transferEncoding: upstream.headers.get("transfer-encoding") || null,
    cacheControl: upstream.headers.get("cache-control") || null,
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    log("upstream non-ok/no-body", {
      status: upstream.status,
      bodyPreview: preview(text),
    });
    throw createError({
      statusCode: upstream.status || 502,
      statusMessage:
        text ||
        `Failed to stream response from local AI API (${upstream.status})`,
    });
  }

  const res = event.node.res;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const req = event.node.req;
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  let totalChunks = 0;
  let totalBytes = 0;
  let startedAt = Date.now();

  const abortUpstream = () => {
    log("client disconnected; cancelling upstream reader");
    try {
      reader.cancel();
    } catch {}
  };

  req.on("close", abortUpstream);
  req.on("aborted", abortUpstream);

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        log("upstream stream completed");
        break;
      }
      if (!value) continue;

      totalChunks += 1;
      totalBytes += value.byteLength;

      const chunkText = decoder.decode(value, { stream: true });
      if (!chunkText) continue;

      log("proxy chunk", {
        index: totalChunks,
        bytes: value.byteLength,
        preview: preview(chunkText),
      });

      // Write plain string to avoid adapter-specific Buffer/Uint8Array quirks.
      res.write(chunkText);
    }

    const tail = decoder.decode();
    if (tail) {
      totalChunks += 1;
      totalBytes += new TextEncoder().encode(tail).byteLength;
      log("proxy tail chunk", {
        index: totalChunks,
        preview: preview(tail),
      });
      res.write(tail);
    }
  } catch (err) {
    log("proxy stream error", {
      message: err?.message || String(err),
    });

    if (!res.writableEnded) {
      res.write(
        encoder.encode(
          'event: error\ndata: {"message":"Stream interrupted by proxy."}\n\n'
        )
      );
    }
  } finally {
    req.off("close", abortUpstream);
    req.off("aborted", abortUpstream);

    if (!res.writableEnded) {
      res.end();
    }

    log("proxy closed", {
      chunks: totalChunks,
      bytes: totalBytes,
      durationMs: Date.now() - startedAt,
      writableEnded: res.writableEnded,
    });
  }
});
