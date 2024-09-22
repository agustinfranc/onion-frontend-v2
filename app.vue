<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>

    <v-footer app>
      <div class="d-flex justify-space-between w-100">
        <div class="text-left">
          <span>&copy; 2020 - </span>

          <span> {{ new Date().getFullYear() }}</span>
        </div>

        <div class="text-center">
          <span>
            made with
            <v-icon>mdi-heart</v-icon> by
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
          <a href="https://www.instagram.com/onion.com.ar/" target="_blank">
            <v-icon class="mx-1" size="24px">mdi-instagram</v-icon>
          </a>

          <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-app-bar--is-scrolled .v-app-bar-title__placeholder {
  visibility: visible !important;
}
</style>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>
