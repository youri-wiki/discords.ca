export default defineEventHandler(async () => {
  const apiBase = "http://70.81.191.192:8000";

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
      upstream: "70.81.191.192:8000",
      reachable: true,
    };
  } catch (error) {
    if (error?.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 502,
      statusMessage: "Unable to reach local AI API at 10.0.0.213:8000",
    });
  }
});
