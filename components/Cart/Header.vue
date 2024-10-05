<template>
  <AppBar :to="localeRoute({ name: 'commerce' })" title="Mi carrito" />
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>
