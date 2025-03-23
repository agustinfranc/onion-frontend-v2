<template>
  <div>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span>Tus datos</span>

        <OrderSelectionButton
          :highlight="!!order.client.name"
          @click="selectionDialog = true"
        />
      </v-card-title>

      <v-card-text class="d-flex align-center">
        <div>
          <h3>{{ order.client.name ?? "..." }}</h3>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="selectionDialog">
      <OrderPersonalDetailsSelection @on-submit="selectionDialog = false" />
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from "~/interfaces/order";

const selectionDialog = ref(false);

const order = useState<Order>("order");
</script>
