<template>
  <div>
    <template v-if="!commerce">
      <CommerceSkeleton />
    </template>

    <template v-else>
      <CommerceBody />

      <CommerceCartButton v-if="cart?.length" />

      <!-- <ActionButton /> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import type { CartProduct } from "~/interfaces/cart";
import type { Commerce } from "~/interfaces/commerce";

const theme = useTheme();
const { t } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();
const commerce = useState<Commerce>("commerce");

const cart = useState<CartProduct[]>("cart");

if (!commerce.value) {
  // Calls fast endpoint in the server side to get commerce fullname and covers
  const { data: commerceMetadata } = await useFetch(
    `${config.public.apiUrl}/${route.params.commerce}?simplified=true`,
    {
      key: "commerceMetadata",
    }
  );

  const url =
    config.public.useDynamicApiUrl && window?.location?.host
      ? `https://api.${window?.location?.host}/api/${route.params.commerce}`
      : `${config.public.apiUrl}/${route.params.commerce}`;

  // Calls full commerce endpoint
  useLazyFetch<Commerce>(url, {
    key: "commerce",
    server: false,
    deep: false,
    dedupe: "defer",
    onResponse({ response }) {
      if (response?._data) {
        commerce.value = response._data;
        theme.global.name.value = response._data.dark_theme ? "dark" : "light";
      }
    },
  });

  commerceMetadata.value &&
    useHead({
      title: `${commerceMetadata.value.fullname} | Onion`,
      titleTemplate: `${commerceMetadata.value.fullname} | Onion`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${commerceMetadata.value.fullname} | ${t(
            "Access to our digital menu"
          )} | ${t("Developed by Onion")}`,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: `${commerceMetadata.value.fullname} | Onion`,
        },
        {
          hid: "og:host",
          property: "og:host",
          content: `https://onion.ar/${commerceMetadata.value.name}`,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://onion.ar/${commerceMetadata.value.name}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: commerceMetadata.value.cover_dirname,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `${commerceMetadata.value.fullname} | ${t(
            "Access to our digital menu"
          )} | ${t("Developed by Onion")}`,
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://onion.ar/${commerceMetadata.value.name}`,
        },
      ],
    });
}
</script>

<style>
.v-chip.v-size--default.v-chip-h--inherit {
  height: inherit;
}
</style>
