<template>
  <div>
    <v-container class="d-flex justify-space-between">
      <span>{{ t("Subtotal") }}:</span>
      <span>${{ subtotalCalc }}</span>
    </v-container>

    <v-card :title="t('¿Necesitas aclarar algo?')">
      <v-card-text>
        <v-textarea
          v-model="note"
          :label="t('Notas al pedido')"
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

const { t } = useI18n();

const order = useState<Order>("order");

const subtotalCalc = useStore("subtotalCalc") as ComputedRef<number>;

const note = ref();

function setOrderNote(note: string) {
  order.value.note = note;
}
</script>
