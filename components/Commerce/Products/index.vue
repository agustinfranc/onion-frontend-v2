<template>
  <div>
    <div
      v-for="rubro in rubrosFiltered"
      :id="rubro.link_name"
      :key="rubro.id"
      class="theme--parent"
    >
      <v-container :key="rubro.name">
        <h3>{{ rubro.name }}</h3>
      </v-container>

      <div class="px-3">
        <v-divider></v-divider>
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
          @onOpenSelectedItemDialog="openSelectedItemDialog"
          @onShowImageDialog="showImageDialog"
        />

        <!-- Slides -->
        <!-- <CommerceProductsSlide
          v-if="subrubro.commerces[0].pivot.slideable"
          :key="subrubro.id"
          :products="subrubro.products"
          @onOpenSelectedItemDialog="openSelectedItemDialog"
          @onShowImageDialog="showImageDialog"
        /> -->
      </template>
    </div>

    <!-- <ImageDialog v-model="imageDialog.show" :dialog="imageDialog" /> -->
  </div>
</template>

<script setup lang="ts">
import type { Commerce, Product } from "~/interfaces/commerce";

const router = useRouter();
const commerce = useState<Commerce>("commerce");

const rubrosFiltered = computed(() => commerce.value.rubros);

const imageDialog = ref({
  show: false,
  imgSrc: "",
  imgLazySrc: "https://picsum.photos/id/11/10/6",
});

function showImageDialog(item: Product) {
  if (!item.avatar_dirname) return;

  imageDialog.value.imgSrc = `${item.avatar_dirname}${
    item.avatar ? item.avatar : ""
  }`;

  imageDialog.value.show = true;
}

function openSelectedItemDialog(id: number) {
  if (typeof id !== "number") return;

  router.push({ path: `/${commerce.value.name}/${id}` });
}
</script>
