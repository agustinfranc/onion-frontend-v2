<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ $t("Delivery address") }}
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="address"
          :rules="addressRules"
          :label="$t('Address')"
          required
        />

        <v-text-field
          v-model="floor"
          :rules="floorRules"
          :label="$t('Floor/Apartment')"
          required
        />

        <v-text-field
          v-model="description"
          :rules="descriptionRules"
          :label="$t('Delivery instructions')"
          required
        />

        <v-btn
          block
          color="success"
          class="mr-4"
          :disabled="!valid"
          @click="validate"
        >
          {{ $t("Submit") }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Order, OrderAddress } from "~/interfaces/order";

const emit = defineEmits(["onSubmit"]);

const valid = ref(false);
const address = ref("");
const floor = ref("");
const description = ref("");

const addressRules = [
  (v: string) => !!v || "Address is required",
  (v: string) => v.length <= 100 || "Address must be less than 100 characters",
];
const floorRules = [
  (v: string) => v.length <= 10 || "Floor must be less than 10 characters",
];
const descriptionRules = [
  (v: string) =>
    v.length <= 100 || "Description must be less than 100 characters",
];

const form = useTemplateRef("form");

async function validate() {
  const res = await form.value?.validate();

  if (!res?.valid) return;

  await saveAddress({
    address: address.value,
    floor: floor.value,
    description: description.value,
  });

  emit("onSubmit");
}

const order = useState<Order>("order");

async function saveAddress(addressDetails: OrderAddress) {
  order.value.address = addressDetails;
}
</script>
