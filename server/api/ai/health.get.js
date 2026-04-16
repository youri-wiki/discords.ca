export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiBase =
    (typeof config?.aiApiBase === "string" && config.aiApiBase.trim()) ||
    "http://127.0.0.1:8000";

  let upstreamHost = "unknown";
  try {
    upstreamHost = new URL(apiBase).host;
  } catch {
    upstreamHost = String(apiBase).replace(/^https?:\/\//, "");
  }

  try {
    const response = await fetch(`${apiBase}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw createError({
        statusCode: response.status || 502,
        statusMessage:
          data?.detail ||
          data?.statusMessage ||
          data?.message ||
          "Local AI API health check failed",
      });
    }

    return {
      status: data?.status ?? "unknown",
      upstream: upstreamHost,
      reachable: true,
    };
  } catch (error) {
    if (error?.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 502,
      statusMessage: `Unable to reach local AI API at ${upstreamHost}`,
    });
  }
});
