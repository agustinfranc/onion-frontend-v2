<template>
  <div>
    <OrderHeader />

    <v-container>
      <OrderCommerceDetails class="mb-3" />

      <OrderPersonalDetails class="mb-3" />

      <OrderDeliveryDetails class="mb-3" />

      <OrderPayMethod />
    </v-container>

    <OrderActionButton />
  </div>
</template>

<script lang="ts" setup>
import type { Commerce } from "~/interfaces/commerce";

const commerce = useState<Commerce>("commerce");
const localeRoute = useLocaleRoute();
const route = useRoute();

if (!commerce.value) {
  const to = localeRoute({
    name: "commerce",
    params: { commerce: route.params.commerce },
  });

  if (to) {
    navigateTo(to);
  }
}
</script>
