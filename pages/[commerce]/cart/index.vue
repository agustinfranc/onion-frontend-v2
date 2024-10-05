<template>
  <div>
    <CartHeader />

    <v-container style="padding-bottom: 68px">
      <CartProducts />

      <v-divider class="mb-3" />

      <CartDetails />
    </v-container>

    <CartActionButton />
  </div>
</template>

<script lang="ts" setup>
import type { CartProduct } from "~/interfaces/cart";
import type { Commerce } from "~/interfaces/commerce";

const commerce = useState<Commerce>("commerce");
const cart = useState<CartProduct[]>("cart");
const localeRoute = useLocaleRoute();

if (!cart) {
  const route = localeRoute({
    name: "commerce",
    params: { commerce: commerce.value.name },
  });

  if (route) {
    navigateTo(route);
  }
}
</script>
