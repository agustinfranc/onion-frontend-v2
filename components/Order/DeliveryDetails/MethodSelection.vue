<template>
  <v-card>
    <v-card-title class="text-h5"> {{ $t("Delivery method") }} </v-card-title>

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
          v-for="method in deliveryMethods"
          :key="method.id"
          :value="method.id"
          :disabled="method.disabled"
          :title="method.name"
        />

        <v-select
          v-if="withTimeOptions && selected"
          v-model="selectedTimeOption"
          class="mt-3 px-3"
          :label="$t('Select pick-up time slot')"
          :items="items"
        />
      </v-list>

      <v-btn
        block
        color="success"
        class="mt-4"
        :disabled="isConfirmDisabled"
        @click="select"
      >
        {{ $t("Submit") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Order } from "~/interfaces/order";

const emit = defineEmits(["onSubmit"]);

const order = useState<Order>("order");

const selected = ref<number>();
const selectedTimeOption = ref<string>();

const deliveryMethods = computed(() => {
  return [
    {
      id: 1,
      name: "Delivery a domicilio",
      disabled: !order.value.branch?.has_delivery,
    },
    {
      id: 2,
      name: "Retiro en el local",
      disabled: !order.value.branch?.has_takeaway,
    },
  ];
});

const items = computed(() => {
  return order.value.branch?.commerce_branch_order_time_options
    .filter((item) => !item.disabled)
    .map((item) => `${item.start_time} - ${item.end_time}`);
});

const isConfirmDisabled = computed(() => {
  if (selected.value === undefined) return true;

  if (selected.value === 0) return false;

  if (withTimeOptions.value) {
    return !selectedTimeOption.value;
  }

  return false;
});

const withTimeOptions = computed(() => {
  return selected.value === 2 && isVogliamoDel.value;
});

const isVogliamoDel = computed(() => {
  return order.value.branch?.name === "vogliamo-del";
});

async function select() {
  if (!selected.value) {
    return;
  }

  const method = deliveryMethods.value.find(
    (method) => method.id === selected.value
  );

  order.value.deliveryMethod = {
    ...method,
    selectedTimeOption: selectedTimeOption.value,
  };

  emit("onSubmit");
}
</script>

<style lang="scss">
.active-item--custom {
  border: thin solid currentColor;
}
</style>
