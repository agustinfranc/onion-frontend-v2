<template>
  <v-sheet
    height="280"
    class="v-image__image--cover background-cover"
    :style="`background-image: linear-gradient(to top, rgba(30, 30, 30, 0.2), rgba(99, 99, 99, 0)), url(${commerce.cover_dirname});`"
  >
    <div class="d-flex flex-column align-end justify-end h-100">
      <div
        class="ma-3 mb-auto position-fixed top-0 right-0"
        style="z-index: 2"
        @mouseover="showSeachField"
        @mouseout="hideSeachField"
      >
        <v-btn v-if="!displaySearch" icon size="small">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-text-field
          ref="searchField"
          v-model="search"
          variant="solo"
          clearable
          :label="t('Search')"
          :class="{ 'd-block': displaySearch, 'd-none': !displaySearch }"
          @focusout="hideSeachField"
        ></v-text-field>
      </div>

      <div class="position-fixed" style="top: 100px">
        <v-img
          v-if="commerce.avatar_dirname"
          class="avatar ma-3 rounded-circle"
          :src="commerce.avatar_dirname"
          width="100"
          height="100"
        ></v-img>
      </div>

      <div
        class="transition-swing text-h5 pa-3 rounded-t-xl d-flex justify-space-between align-center theme--parent w-100"
        style="z-index: 1"
      >
        {{ commerce.fullname }}

        <div>
          <a
            v-if="commerce.whatsapp_number"
            :href="`https://wa.me/${commerce.whatsapp_number}/`"
            target="_blank"
          >
            <v-icon class="mx-1" size="24px">mdi-whatsapp</v-icon>
          </a>

          <a
            v-if="commerce.phone_number"
            :href="`tel:${commerce.phone_number}`"
          >
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
            :href="`https://vm.tiktok.com/${commerce.tiktok_account}/`"
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
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import type { Commerce } from "~/interfaces/commerce";

const { t } = useI18n();

const commerce = useState<Commerce>("commerce");
const search = useState<string>("search");

const displaySearch = ref(false);
const searchField = useTemplateRef("searchField");

function hideSeachField() {
  if (!search.value) {
    displaySearch.value = false;
  }
}

function showSeachField() {
  displaySearch.value = true;

  setTimeout(() => {
    searchField.value?.focus();
  });
}
</script>

<style scoped>
.background-cover {
  background-attachment: fixed;
  background-size: contain;
  background-position: center top;
  background-repeat: repeat;
}

.avatar {
  border: 3px solid var(--v-theme-background);
}
</style>
