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
      >{{ t("ir a mi carrito") }}</v-btn
    >
  </v-container>
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
const { t } = useI18n();
</script>

<style scoped>
.v-container {
  bottom: var(--footer-height);
  left: 0;
}
</style>
