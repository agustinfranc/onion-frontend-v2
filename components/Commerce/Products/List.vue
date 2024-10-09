<template>
  <v-container class="commerce-products-list">
    <v-list mandatory lines="three" class="px-0 bg-background">
      <v-list-item
        v-for="item in props.products"
        :id="`${item.code ?? item.id}`"
        :key="item.id"
        density="comfortable"
        class="mb-2 bg-surface"
        @click="commerce.can_order && openSelectedItemDialog(item.id)"
      >
        <template #prepend>
          <div class="mr-4">
            <v-img
              v-if="item.avatar_dirname"
              rounded
              cover
              height="100"
              width="100"
              :src="`${item.avatar_dirname}${item.avatar ?? ''}`"
              :class="{ disabled: item.disabled }"
              @click="!commerce.can_order && showImageDialog(item)"
            >
              <div
                v-if="item.disabled"
                class="fill-height d-flex flex-column justify-center"
              >
                <v-chip
                  size="x-small"
                  class="ma-2 justify-center"
                  color="red"
                  text-color="white"
                  variant="flat"
                >
                  {{ $t("Disabled") }}
                </v-chip>
              </div>
            </v-img>
          </div>
        </template>

        <v-list-item-title class="mb-2">{{ item.name }}</v-list-item-title>

        <v-list-item-subtitle class="mb-1">
          <v-tooltip
            v-if="!commerce.can_order"
            location="bottom"
            close-delay="500"
          >
            <template #activator="{ props }">
              <span v-bind="props">{{ item.description }}</span>
            </template>

            <span>{{ item.description }}</span>
          </v-tooltip>
          <span v-else>{{ item.description }}</span>
        </v-list-item-subtitle>

        <div>
          <span
            v-if="item.price && !item.product_prices.length"
            class="mt-1 text-body-2 font-weight-black"
            >{{ commerce.currency ? commerce.currency.symbol : ""
            }}{{ item.price }}</span
          >

          <v-chip
            v-for="price in item.product_prices"
            v-else
            :key="price.id"
            class="v-chip-h--inherit ma-1 text-center"
            variant="outlined"
            size="small"
            label
          >
            <span v-if="price.name" class="mr-2"
              >{{ price.name ? price.name + " " : "" }}
            </span>
            <span v-if="price.price">
              {{
                commerce.currency
                  ? commerce.currency.symbol + price.price
                  : price.price
              }}
            </span>
          </v-chip>
        </div>

        <template v-for="hashtag in item.product_hashtags" :key="hashtag.id">
          <nuxt-link
            :to="`#${hashtag.to}`"
            @click.native="scrollTo(`#${hashtag.to}`)"
          >
            <span class="mt-1 text-body-2">{{ hashtag.name }}</span>
          </nuxt-link>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { useScroller } from "@/composables/useScroller";
import type { PropType } from "vue";
import type { Commerce, Product } from "~/interfaces/commerce";

const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});

const { scrollTo } = useScroller();

const commerce = useState<Commerce>("commerce");

const emit = defineEmits(["onOpenSelectedItemDialog", "onShowImageDialog"]);

function openSelectedItemDialog(id: number) {
  emit("onOpenSelectedItemDialog", id);
}
function showImageDialog(item: Product) {
  emit("onShowImageDialog", item);
}
</script>

<style lang="scss" scoped>
.v-list-item-title {
  -webkit-line-clamp: 2;
  line-clamp: 2;
  white-space: initial;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

:deep(.v-list-item) {
  .v-list-item__prepend {
    padding-top: initial !important;
  }

  .v-list-item__content {
    height: 100%;
  }
}
</style>
