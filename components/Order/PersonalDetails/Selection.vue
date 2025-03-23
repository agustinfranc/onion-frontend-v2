<template>
  <v-card>
    <v-card-title class="text-h5"> Tus datos </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="validate">
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Nombre y apellido"
          required
        />

        <v-btn
          block
          color="success"
          class="mr-4"
          :disabled="!valid"
          @click="validate"
        >
          Confirmar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { Order } from "~/interfaces/order";

const emit = defineEmits(["onSubmit"]);

const valid = ref(false);
const name = ref("");
const nameRules = ref([
  (v: string) => !!v || "Name is required",
  (v: string) => v.length <= 100 || "Name must be less than 200 characters",
]);

const order = useState<Order>("order");

const form = useTemplateRef("form");

async function validate() {
  const res = await form.value?.validate();

  if (!res?.valid) return;

  order.value.client = {
    name: name.value,
  };

  emit("onSubmit");
}
</script>
