<template>
  <v-container class="px-2 bg-background position-fixed">
    <v-btn
      block
      nuxt
      size="large"
      color="primary"
      :to="
        localeRoute({
          name: 'commerce-cart',
        })
      "
      >{{ $t("view my cart") }}</v-btn
    >
  </v-container>
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>

<style scoped>
.v-container {
  bottom: var(--footer-height);
  left: 0;
}
</style>
