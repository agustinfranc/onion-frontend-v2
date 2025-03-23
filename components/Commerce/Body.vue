<template>
  <div class="commerce-body">
    <template v-if="commerce?.name">
      <CommerceTitle @on-title-intersect="onTitleIntersect" />
    </template>

    <div class="position-relative bg-background">
      <v-container
        v-if="!newHeaderConcept && commerce.rubros"
        class="bg-background"
      >
        <h3>{{ t("Categories") }}</h3>

        <v-divider class="mt-4"/>
      </v-container>

      <CommerceCategories :is-title-intersecting="isTitleIntersecting" />

      <CommerceProducts />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Commerce } from "~/interfaces/commerce";

const { t } = useI18n();
const commerce = useState<Commerce>("commerce");

const newHeaderConcept = ref(true);
provide("newHeaderConcept", newHeaderConcept);

const isTitleIntersecting = ref(true);
function onTitleIntersect(isIntersecting: boolean) {
  isTitleIntersecting.value = isIntersecting;
}
</script>

<style scoped>
div.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.commerce-body {
  padding-bottom: 68px;
}
</style>
