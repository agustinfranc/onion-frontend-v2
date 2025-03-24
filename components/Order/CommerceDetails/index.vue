<template>
  <div>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span>{{ $t("Branch") }}</span>

        <OrderSelectionButton
          v-if="commerce.branches?.length"
          :highlight="!!order.branch"
          :highlight-text="$t('Select')"
          @click="selectionDialog = true"
        />
      </v-card-title>

      <v-card-text class="d-flex align-center">
        <v-img
          max-width="64"
          max-height="64"
          rounded
          class="rounded mr-3"
          :src="commerce.cover_dirname"
        />

        <div v-if="order.branch">
          <h3>{{ order.branch.fullname }}</h3>
          <h4 v-if="order.branch.address">{{ order.branch.address }}</h4>
        </div>

        <div v-else>
          <h3>...</h3>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="selectionDialog">
      <OrderCommerceDetailsSelection @on-submit="selectionDialog = false" />
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Commerce } from "~/interfaces/commerce";
import type { Order } from "~/interfaces/order";

const commerce = useState<Commerce>("commerce");
const order = useState<Order>("order");

const selectionDialog = ref(false);
</script>
