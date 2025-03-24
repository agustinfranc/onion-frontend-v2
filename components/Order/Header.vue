<template>
  <AppBar
    :to="localeRoute({ name: 'commerce-cart' })"
    :title="$t('Mi pedido')"
  />
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>
