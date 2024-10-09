<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <span>Método de pago</span>

      <OrderSelectionButton
        :highlight="!!order.payMethod.name"
        :highlight-text="'Seleccionar'"
        :disabled="!order.branch"
        @click="selectionDialog = true"
      />
    </v-card-title>

    <v-card-text class="d-flex align-center">
      <v-icon size="large" class="mr-3"> mdi-cash-multiple </v-icon>

      <div v-if="order.payMethod.name">
        <h3>{{ order.payMethod.name }}</h3>
      </div>

      <div v-else>
        <h3>...</h3>
      </div>
    </v-card-text>

    <v-dialog v-model="selectionDialog">
      <OrderPayMethodSelection @onSubmit="selectionDialog = false" />
    </v-dialog>
  </v-card>
</template>

<script lang="ts" setup>
import type { Order } from "~/interfaces/order";

const order = useState<Order>("order");

const selectionDialog = ref(false);
</script>
