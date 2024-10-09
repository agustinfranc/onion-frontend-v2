<template>
  <v-card>
    <v-card-title class="text-h5"> Elegí una sucursal </v-card-title>

    <v-card-text>
      <v-list
        nav
        lines="two"
        active-class="active-item--custom"
        color="primary"
        class="bg-background"
        @click:select="(e) => (selected = e.id as number)"
      >
        <v-list-item
          v-for="branch in commerce.branches"
          :key="branch.id"
          :value="branch.id"
          :title="branch.fullname"
          :subtitle="branch.address"
        />
      </v-list>

      <v-btn
        block
        color="success"
        class="mt-4"
        :disabled="!selected"
        @click="select"
      >
        Confirmar
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Commerce } from "~/interfaces/commerce";
import type { Order } from "~/interfaces/order";

const emit = defineEmits(["onSubmit"]);

const commerce = useState<Commerce>("commerce");
const order = useState<Order>("order");

const selected = ref<number>();

async function select() {
  if (!selected.value) return;

  const branch = commerce.value.branches.find(
    (branch) => branch.id === selected.value
  );

  if (!branch) return;

  order.value.branch = branch;
  order.value.deliveryMethod = null;

  emit("onSubmit");
}
</script>

<style lang="scss" scoped>
.active-item--custom {
  border: thin solid currentColor;
}
</style>
