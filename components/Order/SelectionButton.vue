<template>
  <v-btn
    variant="flat"
    :disabled="disabled"
    :color="highlight ? 'light' : 'success'"
    @click="$emit('click')"
    >{{ highlight ? $t("Edit") : $t(highlightText) }}</v-btn
  >
</template>

<script lang="ts" setup>
const { highlightText } = defineProps({
  highlight: Boolean,
  disabled: Boolean,
  highlightText: {
    type: String,
    default: "Fill",
  },
});
</script>
