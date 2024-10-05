<template>
  <v-container class="position-fixed bg-background">
    <v-btn
      size="large"
      block
      color="primary"
      nuxt
      :to="localeRoute({ name: 'commerce-order' })"
      :disabled="!cart.length"
      >Continuar</v-btn
    >
  </v-container>
</template>

<script lang="ts" setup>
import type { CartProduct } from "~/interfaces/cart";

const cart = useState<CartProduct[]>("cart");
const localeRoute = useLocaleRoute();
</script>

<style lang="scss" scoped>
.v-container {
  bottom: var(--footer-height);
  left: 0;
}
</style>
