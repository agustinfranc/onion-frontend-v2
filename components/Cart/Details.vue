<template>
  <div>
    <v-container class="d-flex justify-space-between">
      <span>Subtotal:</span>
      <span>${{ subtotalCalc }}</span>
    </v-container>

    <v-card title="¿Necesitas aclarar algo?">
      <v-card-text>
        <v-textarea
          v-model="note"
          label="Notas al pedido"
          counter
          rows="1"
          @change="setOrderNote"
        ></v-textarea>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { CartProduct } from "~/interfaces/cart";
import type { Order } from "~/interfaces/order";

const order = useState<Order>("order");

const cart = useState<CartProduct[]>("cart");

const subtotalCalc = computed(() =>
  cart.value.reduce(
    (previous, current) => previous + current.price * current.quantity,
    0
  )
);

const note = ref();

function setOrderNote(note: string) {
  order.value.note = note;
}
</script>
