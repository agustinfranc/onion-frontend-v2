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
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from "~/interfaces/order";

const order = useState<Order>("order");

const subtotalCalc = useStore("subtotalCalc") as ComputedRef<number>;

const note = ref();

function setOrderNote(note: string) {
  order.value.note = note;
}
</script>
