<template>
  <div>
    <div class="mt-3">
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span> Detalle de entrega </span>

          <v-btn
            variant="flat"
            :disabled="!order.branch"
            :color="!!order.deliveryMethod ? 'light' : 'success'"
            @click="() => (selectionMethodDialog = !selectionMethodDialog)"
            >{{ !!order.deliveryMethod ? "Cambiar" : "Seleccionar" }}</v-btn
          >
        </v-card-title>

        <v-card-text class="d-flex align-center">
          <v-img
            max-width="64"
            max-height="64"
            rounded
            class="rounded mr-3"
            src="/img/location.jpeg"
          />

          <div v-if="!order.branch || !order.deliveryMethod">
            <h3>...</h3>
          </div>

          <div v-else-if="order.deliveryMethod?.id === 1">
            <h3>Dirección de entrega</h3>
            <h4>{{ order.address.address ? order.address.address : "..." }}</h4>
            <h4 v-if="order.address.floor">{{ order.address.floor }}</h4>
            <h4 v-if="order.address.description">
              {{ order.address.description }}
            </h4>
          </div>

          <div v-else>
            <h3>Retiro en el local</h3>
            <h4>{{ order.branch.address }}</h4>
            <h4 v-if="order.deliveryMethod?.selectedTimeOption">
              {{ order.deliveryMethod.selectedTimeOption }}
            </h4>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-dialog v-model="selectionDialog">
      <OrderDeliveryDetailsSelection @on-submit="selectionDialog = false" />
    </v-dialog>

    <v-dialog v-model="selectionMethodDialog">
      <OrderDeliveryDetailsMethodSelection @on-submit="onSubmitDeliveryMethod" />
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Order } from "~/interfaces/order";

const order = useState<Order>("order");

const selectionDialog = ref(false);
const selectionMethodDialog = ref(false);

function onSubmitDeliveryMethod() {
  selectionMethodDialog.value = false;

  if (order.value.deliveryMethod?.id === 1) {
    selectionDialog.value = true;
  }
}
</script>
