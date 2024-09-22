<template>
  <div class="commerce-body">
    <template v-if="commerce?.name">
      <CommerceTitle />
    </template>

    <div class="position-relative theme--parent">
      <v-container v-if="commerce.rubros" class="theme--parent">
        <h3>{{ t("Categories") }}</h3>

        <v-divider class="mt-4"></v-divider>
      </v-container>

      <CommerceCategories :rubros="commerce.rubros" />

      <!-- <CommerceProducts /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Commerce } from "~/interfaces/commerce";

const { t } = useI18n();
const commerce = useState<Commerce>("commerce");
</script>

<style scoped>
div.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.commerce-body {
  padding-bottom: 68px;
}
</style>
