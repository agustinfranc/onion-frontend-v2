<template>
  <div class="theme--parent position-sticky top-0">
    <div class="container py-1">
      <v-chip-group column v-model="selection">
        <v-chip
          v-for="rubro in rubrosFiltered"
          :key="rubro.link_name ?? rubro.name"
          color="orange"
          :value="rubro.link_name"
        >
          <nuxt-link
            :to="`#${rubro.link_name}`"
            @click.native="scrollTo(`#${rubro.link_name}`)"
          >
            <span class="v-chip__personalized">{{ rubro.name }}</span>
          </nuxt-link>
        </v-chip>
      </v-chip-group>
    </div>

    <v-divider></v-divider>
  </div>
</template>

<script setup lang="ts">
import type { Commerce } from "~/interfaces/commerce";

const commerce = useState<Commerce>("commerce");
const rubrosFiltered = computed(() => commerce.value.rubros);

const route = useRoute();
const selection = ref(route.hash.slice(1));

function scrollTo(hashtag: string) {
  const el = document.getElementById(route.hash.slice(1));
  if (el) {
    window.scrollTo(0, el.offsetTop);
  }
}
</script>

<style scoped>
div.theme--parent {
  z-index: 1;
}
</style>
