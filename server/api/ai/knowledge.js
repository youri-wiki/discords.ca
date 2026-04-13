export default defineEventHandler(async (event) => {
  const apiBase = "http://10.0.0.213:8000";
  const method = event.node.req.method || "GET";

  if (method === "GET") {
    try {
      const response = await fetch(`${apiBase}/knowledge`, {
        method: "GET",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage:
            data?.statusMessage ||
            data?.message ||
            data?.detail ||
            "Failed to fetch knowledge entries",
        });
      }

      return {
        count: Number(data?.count ?? 0),
        data: Array.isArray(data?.data) ? data.data : [],
      };
    } catch (error) {
      if (error?.statusCode) {
        throw error;
      }

      throw createError({
        statusCode: 502,
        statusMessage: "Unable to reach local AI API for knowledge listing",
      });
    }
  }

  if (method === "POST") {
    const body = await readBody(event);
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    const metadata = body?.metadata;

    if (!text) {
      throw createError({
        statusCode: 400,
        statusMessage: "Field 'text' is required",
      });
    }

    if (
      metadata === undefined ||
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Field 'metadata' is required and must be a JSON object",
      });
    }

    if (Object.keys(metadata).length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Field 'metadata' must not be empty",
      });
    }

    try {
      const response = await fetch(`${apiBase}/knowledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          metadata,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage:
            data?.statusMessage ||
            data?.message ||
            data?.detail ||
            "Failed to store knowledge entry",
        });
      }

      return data;
    } catch (error) {
      if (error?.statusCode) {
        throw error;
      }

      throw createError({
        statusCode: 502,
        statusMessage: "Unable to reach local AI API for knowledge storage",
      });
    }
  }

  if (method === "DELETE") {
    try {
      const response = await fetch(`${apiBase}/knowledge`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage:
            data?.statusMessage ||
            data?.message ||
            data?.detail ||
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
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Method Not Allowed",
  });
});
