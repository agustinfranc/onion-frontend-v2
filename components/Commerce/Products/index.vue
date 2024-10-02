<template>
  <div>
    <div
      v-for="rubro in filteredCategories"
      :id="rubro.link_name"
      :key="rubro.id"
      class="theme--parent category"
    >
      <v-container :key="rubro.name">
        <h3>{{ rubro.name }}</h3>
      </v-container>

      <div class="px-3">
        <v-divider />
      </div>

      <template v-for="subrubro in rubro.subrubros">
        <v-container
          v-if="!subrubro.is_general"
          :id="subrubro.link_name"
          :key="subrubro.id"
          class="pb-0 font-weight-bold"
        >
          <span>{{ subrubro.name }}</span>
        </v-container>

        <!-- Lists -->
        <CommerceProductsList
          v-if="!subrubro.commerces[0]?.pivot.slideable"
          :key="subrubro.id"
          :products="subrubro.products"
          @onOpenSelectedItemDialog="navigateToProductPage"
          @onShowImageDialog="showImageDialog"
        />

        <!-- Slides -->
        <CommerceProductsSlide
          v-else
          :key="subrubro.id"
          :products="subrubro.products"
          @onOpenSelectedItemDialog="navigateToProductPage"
        />
      </template>
    </div>

    <ImageDialog v-model="imageDialog.show" :dialog="imageDialog" />
  </div>
</template>

<script setup lang="ts">
import { useScroller } from "@/composables/useScroller";
import type { Commerce, Product, Rubro } from "~/interfaces/commerce";

const localeRoute = useLocaleRoute();
const router = useRouter();
const commerce = useState<Commerce>("commerce");

const filteredCategories = useStore("filteredCategories") as ComputedRef<
  Rubro[]
>;

const imageDialog = ref({
  show: false,
  imgSrc: "",
  imgLazySrc: "https://picsum.photos/id/11/10/6",
});

function showImageDialog(item: Product) {
  if (!item.avatar_dirname) return;

  imageDialog.value.imgSrc = `${item.avatar_dirname}${item.avatar ?? ""}`;

  imageDialog.value.show = true;
}

function navigateToProductPage(id: number) {
  if (typeof id !== "number") return;

  const route = localeRoute({
    name: "commerce-product",
    params: { product: id, commerce: commerce.value.name },
  });

  if (route) {
    return navigateTo(route);
  }
}

// IntersectionObserver logic

onMounted(() => {
  const route = useRoute();

  if (route.query.category) {
    const { scrollTo } = useScroller();
    scrollTo(route.query.category.toString());
  }

  createObserver();
});

const createObserver = () => {
  const observer = new IntersectionObserver(handleIntersect, {
    rootMargin: "-20% 0px -80% 0px",
  });

  const categories = document.querySelectorAll<HTMLElement>(".category");
  categories.forEach((category) => {
    observer.observe(category);
  });
};

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      updateHash(entry.target.id);
    }
  });
};

const updateHash = (sectionId: string) => {
  if (sectionId) {
    router.replace({ query: { category: sectionId } });
  }
};
</script>
