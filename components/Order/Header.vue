<template>
  <AppBar
    :to="localeRoute({ name: 'commerce-cart' })"
    :title="$t('My order')"
  />
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>
