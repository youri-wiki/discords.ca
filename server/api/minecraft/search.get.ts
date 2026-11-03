import { createError, getQuery, setResponseHeader } from "h3";

interface WikiPage {
  pageid: number;
  title: string;
  index?: number;
  extract?: string;
  canonicalurl?: string;
  thumbnail?: {
    source?: string;
    width?: number;
    height?: number;
  };
}

interface WikiResponse {
  query?: {
    pages?: WikiPage[];
  };
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = String(query.q ?? "").trim();

  if (search.length < 2) {
    throw createError({
      statusCode: 400,
      message: "La recherche doit contenir au moins 2 caractères.",
    });
  }

  if (search.length > 80) {
    throw createError({
      statusCode: 400,
      message: "La recherche est trop longue.",
    });
  }

  try {
    const response = await $fetch<WikiResponse>("https://minecraft.wiki/api.php", {
      query: {
        action: "query",
        generator: "search",
        gsrsearch: search,
        gsrnamespace: 0,
        gsrlimit: 10,
        prop: "extracts|pageimages|info",
        exintro: 1,
        explaintext: 1,
        exsentences: 3,
        piprop: "thumbnail",
        pithumbsize: 320,
        inprop: "url",
        redirects: 1,
        format: "json",
        formatversion: 2,
      },
      headers: {
        "User-Agent": "discords.ca/1.0 (Minecraft Wiki search)",
      },
      timeout: 10000,
    });

    const results = (response.query?.pages ?? [])
      .sort((a, b) => (a.index ?? 999) - (b.index ?? 999))
      .map((page) => ({
        id: page.pageid,
        title: page.title,
        description:
          page.extract?.trim() ||
          "Aucun résumé n’est disponible pour cette page du wiki.",
        url:
          page.canonicalurl ||
          `https://minecraft.wiki/w/${encodeURIComponent(
            page.title.replaceAll(" ", "_")
          )}`,
        thumbnail: page.thumbnail?.source || null,
      }));

    setResponseHeader(event, "Cache-Control", "public, max-age=300, s-maxage=900");

    return {
      query: search,
      count: results.length,
      results,
      source: "Minecraft Wiki",
      sourceUrl: "https://minecraft.wiki/",
    };
  } catch (error: any) {
    if (error?.statusCode === 400) throw error;

    throw createError({
      statusCode: 502,
      message:
        "Le Minecraft Wiki ne répond pas pour le moment. Réessaie dans quelques instants.",
    });
  }
});
