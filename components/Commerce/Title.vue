<template>
  <v-sheet
    height="280"
    class="v-image__image--cover background-cover"
    v-intersect="(isIntersecting: boolean) => emit('onTitleIntersect', isIntersecting)"
    :style="`background-image: linear-gradient(to top, rgba(30, 30, 30, 0.2), rgba(99, 99, 99, 0)), url(${commerce.cover_dirname});`"
  >
    <div class="d-flex flex-column align-end justify-end h-100">
      <div
        v-if="!newHeaderConcept"
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
        class="transition-swing text-h5 pa-3 rounded-t-xl d-flex justify-space-between align-center bg-background w-100 z-1"
      >
        <span>
          {{ commerce.fullname }}
        </span>

        <CommerceLinks />
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import type { Commerce } from "~/interfaces/commerce";

const { t } = useI18n();

const newHeaderConcept = inject("newHeaderConcept");

const emit = defineEmits(["onTitleIntersect"]);

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
