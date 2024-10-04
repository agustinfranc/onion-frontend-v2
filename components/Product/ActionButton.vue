<template>
  <v-container class="px-2 bg-background">
    <v-btn
      large
      block
      color="primary"
      :disabled="disabled"
      :loading="loading"
      @click="emit('addToCart')"
      >{{ $t("Add to cart") }}</v-btn
    >
  </v-container>
</template>

<script lang="ts" setup>
defineProps({
  disabled: Boolean,
  loading: Boolean,
});

const emit = defineEmits(["addToCart"]);
</script>

<style lang="scss" scoped>
.v-container {
  position: fixed;
  bottom: 44px;
  left: 0;
  max-width: initial;
}
</style>
