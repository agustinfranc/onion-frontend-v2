<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ $t("Choose a payment method") }}
    </v-card-title>

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
          v-for="payMethod in payMethods"
          :key="payMethod.id"
          :value="payMethod.id"
          :disabled="payMethod.disabled"
          :title="payMethod.name"
          :subtitle="payMethod?.subtitle || ''"
        />
      </v-list>

      <v-btn
        block
        color="success"
        class="mt-4"
        :disabled="!selected"
        @click="select"
      >
        {{ $t("Submit") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Order, PayMethod } from "~/interfaces/order";

const emit = defineEmits(["onSubmit"]);

const order = useState<Order>("order");

const selected = ref<number>();

const payMethods = computed<PayMethod[]>(() => {
  return [
    {
      id: 1,
      name: "Efectivo",
      disabled: false,
    },
    {
      id: 2,
      name: "MercadoPago",
      subtitle: "Dinero en cuenta, Tarjeta de Débito, Tarjeta de Crédito",
      disabled: !order.value.branch?.mp_enabled,
    },
    {
      id: 3,
      name: "Transferencia",
      subtitle: "Transferencia bancaria (alias)",
      disabled:
        order.value.branch?.name !== "vogliamo-del" &&
        order.value.branch?.name !== "la-herencia",
    },
  ];
});

async function select() {
  if (!selected.value) return;

  const item = payMethods.value.find((el) => el.id === selected.value);

  if (!item) return;

  order.value.payMethod = item;

  emit("onSubmit");
}
</script>

<style lang="scss">
.active-item--custom {
  border: thin solid currentColor;
}
</style>
