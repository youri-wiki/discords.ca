export default defineEventHandler(async (event) => {
  if ((event.node.req.method || "DELETE") !== "DELETE") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  try {
    const response = await fetch("http://10.0.0.213:8000/knowledge", {
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
