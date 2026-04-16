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

  try {
    const response = await fetch(`${apiBase}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question.trim() }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw createError({
        statusCode: response.status || 502,
        statusMessage:
          data?.detail ||
          data?.message ||
          "Failed to get response from local AI API",
      });
    }

    return {
      answer: typeof data?.answer === "string" ? data.answer : "",
      context: Array.isArray(data?.context) ? data.context : [],
    };
  } catch (error) {
    if (error?.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 502,
      statusMessage: `Unable to reach local AI API at ${apiBase}`,
    });
  }
});
