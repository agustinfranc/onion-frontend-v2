<template>
  <v-dialog v-model="show">
    <v-img
      v-if="dialog.show"
      :lazy-src="dialog.imgLazySrc"
      :src="dialog.imgSrc"
    >
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-spacer />

        <v-btn
          class="bg-grey-darken-1"
          icon="mdi-close"
          variant="elevated"
          @click.stop="$emit('update:modelValue', false)"
        />
      </v-app-bar>

      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-row> </template
    ></v-img>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    dialog: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    show: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
