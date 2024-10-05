<template>
  <v-container class="px-2 bg-background position-fixed">
    <v-btn
      block
      nuxt
      large
      color="primary"
      :to="
        localeRoute({
          name: 'commerce-cart',
        })
      "
      >ir a mi carrito</v-btn
    >
  </v-container>
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>

<style lang="scss" scoped>
.v-container {
  bottom: var(--footer-height);
  left: 0;
}
</style>
