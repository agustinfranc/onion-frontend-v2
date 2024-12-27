<template>
  <div>
    <Product
      v-if="data && commerce"
      :item="data"
      :loading="status === 'pending'"
    />
  </div>
</template>

<script setup lang="ts">
import type { Commerce } from "~/interfaces/commerce";
import type { Product } from "~/interfaces/product";

const config = useRuntimeConfig();
const route = useRoute();
const localeRoute = useLocaleRoute();

const commerce = useState<Commerce>("commerce");

if (!commerce.value) {
  const to = localeRoute({
    name: "commerce",
    params: { commerce: route.params.commerce },
  });

  if (to) {
    navigateTo(to);
  }
}

const url =
  config.public.useDynamicApiUrl && window?.location?.host
    ? `https://api.${window?.location?.host}/api/products/${route.params.product}`
    : `${config.public.apiUrl}/products/${route.params.product}`;

const { data, status } = await useLazyFetch<Product>(url);
</script>
