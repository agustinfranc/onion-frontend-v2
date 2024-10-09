<template>
  <v-btn
    variant="flat"
    :disabled="disabled"
    :color="highlight ? 'light' : 'success'"
    @click="$emit('click')"
    >{{ highlight ? "Cambiar" : highlightText }}</v-btn
  >
</template>

<script lang="ts" setup>
defineProps({
  highlight: Boolean,
  disabled: Boolean,
  highlightText: {
    type: String,
    default: "Ingresar",
  },
});
</script>
