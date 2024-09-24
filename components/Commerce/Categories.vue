<template>
  <div class="theme--parent position-sticky top-0">
    <div class="container py-1">
      <v-chip-group column v-model="selection">
        <v-chip
          v-for="rubro in rubrosFiltered"
          :key="rubro.link_name ?? rubro.name"
          size="small"
          color="orange"
          :value="rubro.link_name"
        >
          <nuxt-link
            replace
            :to="{ query: { category: rubro.link_name } }"
            @click.native="scrollTo(rubro.link_name)"
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
import { useScroller } from "@/composables/useScroller";
import type { Commerce } from "~/interfaces/commerce";

const commerce = useState<Commerce>("commerce");
const rubrosFiltered = computed(() => commerce.value.rubros);

const { scrollTo } = useScroller();
const route = useRoute();
const selection = ref(route.query.category);

watch(
  () => route.query,
  async () => {
    selection.value = route.query.category;
  }
);
</script>

<style scoped>
div.theme--parent {
  z-index: 1;
}
</style>
