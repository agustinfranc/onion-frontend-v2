<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>

    <v-footer app class="w-100">
      <div class="d-flex justify-space-between align-center w-100">
        <div class="text-left">
          <span>&copy; 2020 - </span>

          <span> {{ new Date().getFullYear() }}</span>
        </div>

        <div class="text-center">
          <span>
            by
            <router-link to="/">
              <span
                :class="
                  theme.global.name.value === 'dark'
                    ? 'white--text'
                    : 'grey--text text--darken-4'
                "
                >Onion</span
              >
            </router-link>
          </span>
        </div>

        <div class="text-right">
          <v-btn
            v-if="locale === 'en'"
            icon="mdi-translate"
            variant="text"
            density="compact"
            @click="setLocale('es')"
          />

          <v-btn
            v-if="locale === 'es'"
            icon="mdi-translate"
            variant="text"
            density="compact"
            @click="setLocale('en')"
          />

          <a href="https://www.instagram.com/onion.com.ar/" target="_blank">
            <v-icon class="mx-1" size="24px">mdi-instagram</v-icon>
          </a>

          <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import type { Order } from "./interfaces/order";

const { setLocale, locale, getBrowserLocale } = useI18n();

const browserLocale = getBrowserLocale();

if (browserLocale) {
  setLocale(browserLocale);
}

const i18nHead = useLocaleHead({
  addSeoAttributes: {
    canonicalQueries: ["category"],
  },
});

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
});

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

// Initialize store
useState("cart", () => []);

useState<Order>("order", () => ({
  address: {
    address: "",
    floor: "",
    description: "",
  },
  branch: null,
  note: "",
  payMethod: {
    id: 0,
    name: "",
    disabled: false,
  },
  deliveryMethod: null,
  client: {
    name: null,
  },
}));
</script>

<style scoped>
.v-app-bar--is-scrolled .v-app-bar-title__placeholder {
  visibility: visible !important;
}
</style>
