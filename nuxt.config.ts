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
  css: ["~/assets/css/main.scss", "~/assets/css/helpers.scss"],
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
});
