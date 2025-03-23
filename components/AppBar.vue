<template>
  <v-app-bar density="compact" :title="title" flat>
    <template #prepend>
      <v-btn v-if="to" size="small" icon="mdi-arrow-left" nuxt :to="to" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { RouteLocationResolvedGeneric } from "vue-router";

defineProps({
  to: {
    type: Object as PropType<RouteLocationResolvedGeneric>,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #121212;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #f2f2f2;
}
</style>
