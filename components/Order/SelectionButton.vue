<template>
  <v-btn
    variant="flat"
    :disabled="disabled"
    :color="highlight ? 'light' : 'success'"
    @click="$emit('click')"
    >{{ highlight ? $t("Edit") : highlightText }}</v-btn
  >
</template>

<script lang="ts" setup>
const { t } = useI18n();

defineProps({
  highlight: Boolean,
  disabled: Boolean,
  highlightText: {
    type: String,
    default: t("Fill"),
  },
});
</script>
