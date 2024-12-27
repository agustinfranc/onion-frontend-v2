// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "vuetify-nuxt-module",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  css: [
    "~/assets/css/main.scss",
    "~/assets/css/helpers.scss",
    "~/assets/css/vuetify.css",
  ],
  i18n: {
    locales: [
      {
        code: "en",
        language: "en-US",
      },
      {
        code: "es",
        language: "es-ES",
      },
      {
        code: "ar",
        language: "ar-AR",
      },
    ],
    defaultLocale: "es",
    baseUrl: "https://onion.ar",
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
  },
  runtimeConfig: {
    apiSecret: "", // can be overridden by NUXT_API_SECRET environment variable
    public: {
      apiUrl: "http://localhost/api/", // can be overridden by NUXT_PUBLIC_API_URL environment variable
      useDynamicApiUrl: true,
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  // Used to prerender routes using nuxt generate for a static hosting
  // https://nuxt.com/docs/getting-started/prerendering#prerenderroutes-nuxt-hook
  hooks: {
    async "prerender:routes"(ctx) {
      const commerces = await fetch("https://api.onion.ar/api/commerces").then(
        (res) => res.json()
      );
      for (const commerce of commerces) {
        ctx.routes.add(`/${commerce.name}`);
      }
    },
  },
});
