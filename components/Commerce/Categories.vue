<template>
  <div
    id="categories--top-bar"
    class="theme--parent position-sticky top-0 z-1"
    :class="{ 'bg-background': !props.isTitleIntersecting }"
  >
    <v-container
      v-if="newHeaderConcept && !props.isTitleIntersecting"
      class="pb-0 pt-2 d-flex align-center"
    >
      <v-text-field
        clearable
        hide-details
        single-line
        flat
        class="mr-11"
        density="compact"
        :label="t('Search')"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
      ></v-text-field>

      <CommerceLinks />
    </v-container>

    <v-container class="py-2 pr-0">
      <v-chip-group v-if="!newHeaderConcept" column v-model="selection">
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

      <v-slide-group v-else v-model="selection" center-active>
        <v-slide-group-item
          v-for="rubro in rubrosFiltered"
          :key="rubro.link_name ?? rubro.name"
          :value="rubro.link_name"
          v-slot="{ isSelected, toggle }"
        >
          <v-chip class="ma-1" :color="isSelected ? 'orange' : undefined">
            <nuxt-link
              replace
              :to="{ query: { category: rubro.link_name } }"
              @click.native="scrollTo(rubro.link_name)"
            >
              <span class="v-chip__personalized">{{ rubro.name }}</span>
            </nuxt-link>
          </v-chip>
        </v-slide-group-item>
      </v-slide-group>
    </v-container>

    <v-divider></v-divider>
  </div>
</template>

<script setup lang="ts">
import { useScroller } from "@/composables/useScroller";
import type { Commerce } from "~/interfaces/commerce";

const { t } = useI18n();

const newHeaderConcept = inject<Ref>("newHeaderConcept", ref());

const props = defineProps({
  isTitleIntersecting: Boolean,
});

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

onMounted(() => {
  if (!newHeaderConcept.value) {
    const categoriesTopBar = document.querySelector(
      "#categories--top-bar"
    ) as HTMLElement;

    document.documentElement.style.scrollPaddingTop = `${categoriesTopBar.offsetHeight}px`;
  }
});
</script>

<style>
html {
  scroll-padding-top: 105px;
}
</style>
