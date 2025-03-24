<template>
  <AppBar :to="localeRoute({ name: 'commerce' })" :title="$t('My cart')" />
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>
