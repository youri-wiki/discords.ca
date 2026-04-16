export default defineNuxtConfig({
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },
  $development: {},
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    aiApiBase: process.env.AI_API_BASE_URL || "http://127.0.0.1:8000",
    // Keys within public are also exposed client-side
    public: {
      API_BASE_URL: "https://discords.ca/api",
    },

    fontawesome: {
      icons: {
        solid: true,
        brands: true,
      },
    },
  },

  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
});
