export default defineEventHandler(async (event) => {
  if ((event.node.req.method || "DELETE") !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  const config = useRuntimeConfig();
  const apiBase = (
    config.aiApiBaseUrl ||
    process.env.AI_API_BASE_URL ||
    ""
  ).trim();

  if (!apiBase) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Missing AI API base URL configuration (set AI_API_BASE_URL).",
    });
  }

  try {
    const response = await fetch(`${apiBase}/knowledge`, {
      method: "DELETE",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw createError({
        statusCode: response.status || 502,
        statusMessage:
          data?.detail ||
          data?.statusMessage ||
          data?.message ||
          "Failed to delete all knowledge entries",
      });
    }

    return {
      status: data?.status || "all deleted",
    };
  } catch (error) {
    if (error?.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 502,
      statusMessage:
        "Unable to reach local AI API for deleting all knowledge entries",
    });
  }
});
