<template>
  <v-container>
    <v-skeleton-loader v-bind="attrs" type="card-avatar"/>

    <v-skeleton-loader v-bind="attrs" type="heading"/>

    <v-skeleton-loader v-bind="attrs" type="chip@4"/>

    <v-divider class="mb-3"/>

    <v-skeleton-loader v-bind="attrs" type="heading"/>

    <v-row>
      <v-col v-for="p in 2" :key="p" cols="6" md="4">
        <v-sheet class="pa-3">
          <v-skeleton-loader v-bind="attrs" type="card"/>
        </v-sheet>
      </v-col>
    </v-row>

    <v-divider class="mb-3"/>

    <v-skeleton-loader v-bind="attrs" type="heading"/>

    <v-sheet class="pa-3">
      <v-skeleton-loader
        v-for="p in 8"
        :key="p"
        v-bind="attrs"
        type="list-item-avatar-three-line"
      />
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
const attrs = ref({
  class: "mb-6",
  boilerplate: true,
  elevation: 2,
});
</script>

<style>
.v-skeleton-loader__chip {
  display: inline-block;
  margin-right: 4px !important;
  margin-left: 4px !important;
}
</style>
