<template>
  <div>
    <a
      v-if="commerce.whatsapp_number"
      :href="`https://wa.me/${commerce.whatsapp_number}/`"
      target="_blank"
    >
      <v-icon class="mx-1" size="24px">mdi-whatsapp</v-icon>
    </a>

    <a v-if="commerce.phone_number" :href="`tel:${commerce.phone_number}`">
      <v-icon class="mx-1" size="24px">mdi-phone</v-icon>
    </a>

    <a
      v-if="commerce.instagram_account"
      :href="`https://www.instagram.com/${commerce.instagram_account}/`"
      target="_blank"
    >
      <v-icon class="mx-1" size="24px">mdi-instagram</v-icon>
    </a>

    <a
      v-if="commerce.facebook_account"
      :href="`https://www.facebook.com/${commerce.facebook_account}/`"
      target="_blank"
    >
      <v-icon class="mx-1" size="24px">mdi-facebook</v-icon>
    </a>

    <a
      v-if="commerce.tiktok_account"
      :href="`https://tiktok.com/${commerce.tiktok_account}/`"
      target="_blank"
      style="position: relative; top: 4px"
    >
      <img
        width="22"
        height="22"
        src="https://sf16-scmcdn-va.ibytedtos.com/goofy/tiktok/web/node/_next/static/images/logo-dark-e95da587b6efa1520dcd11f4b45c0cf6.svg"
      />
    </a>

    <a
      v-if="commerce.youtube_account"
      :href="`https://www.youtube.com/c/${commerce.youtube_account}/`"
      target="_blank"
    >
      <v-icon class="mx-1" size="24px">mdi-youtube</v-icon>
    </a>

    <a
      v-if="commerce.maps_account"
      :href="commerce.maps_account"
      target="_blank"
    >
      <v-icon class="mx-1" size="24px">mdi-google-maps</v-icon>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { Commerce } from "~/interfaces/commerce";

const commerce = useState<Commerce>("commerce");
</script>
