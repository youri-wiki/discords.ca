export default defineEventHandler(async (event) => {
  if ((event.node.req.method || "DELETE") !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  const query = getQuery(event);
  const text = typeof query?.text === "string" ? query.text.trim() : "";

  if (!text) {
    throw createError({
      statusCode: 400,
      statusMessage: "Query parameter 'text' is required",
    });
  }

  try {
    const response = await fetch(
      `http://10.0.0.213:8000/knowledge/search?text=${encodeURIComponent(text)}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw createError({
        statusCode: response.status || 502,
        statusMessage:
          data?.detail ||
          data?.statusMessage ||
          data?.message ||
          "Failed to delete matching knowledge entries",
      });
    }

    return {
      deleted_ids: Array.isArray(data?.deleted_ids) ? data.deleted_ids : [],
    };
  } catch (error) {
    if (error?.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 502,
      statusMessage:
        "Unable to reach local AI API for deleting matching knowledge entries",
    });
  }
});
