<template>
  <v-container class="position-fixed bg-background">
    <v-btn
      size="large"
      block
      color="primary"
      :disabled="disabled"
      @click="submitOrder"
      >Hacer pedido ${{ subtotalCalc }}</v-btn
    >
  </v-container>
</template>

<script lang="ts" setup>
import { OrderService } from "@/services/order.service";
import type { CartProduct } from "~/interfaces/cart";
import type { Order } from "~/interfaces/order";

const cart = useState<CartProduct[]>("cart");
const order = useState<Order>("order");

const subtotalCalc = useStore("subtotalCalc") as ComputedRef<number>;

const disabled = computed(() => {
  if (
    !cart.value.length ||
    !order.value.branch ||
    !order.value.deliveryMethod ||
    !order.value.payMethod ||
    !order.value.client.name
  ) {
    return true;
  }

  if (order.value.deliveryMethod.id === 1) {
    return !order.value.address.address;
  }

  return false;
});

function submitOrder() {
  OrderService.sendOrder({
    cart: cart.value,
    order: order.value,
  });
}
</script>

<style lang="scss" scoped>
.v-container {
  bottom: var(--footer-height);
  left: 0;
  background: inherit;
}
</style>
