<template>
  <AppBar :to="localeRoute({ name: 'commerce-cart' })" title="Mi pedido" />
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>
