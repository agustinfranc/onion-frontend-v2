<template>
  <v-container>
    <v-slide-group v-model="selection">
      <v-slide-group-item v-for="item in props.products" :key="item.id">
        <v-card
          class="ma-2"
          min-height="370"
          width="224"
          max-width="400"
          @click="commerce.can_order ? openSelectedItemDialog(item.id) : ''"
        >
          <v-img
            v-if="item.avatar_dirname"
            cover
            class="white--text align-end"
            :class="{ disabled: item.disabled }"
            height="200px"
            :src="`${item.avatar_dirname}${item.avatar ?? ''}`"
          >
            <div
              v-if="item.disabled"
              class="fill-height d-flex flex-column justify-center"
            >
              <v-chip small class="ma-2" color="red" text-color="white">
                {{ $t("Disabled") }}
              </v-chip>
            </div>
          </v-img>

          <v-card-title class="text-truncate d-inline-block w-100">
            <v-tooltip location="bottom">
              <template #activator="{ props }">
                <span v-bind="props">{{ item.name }}</span>
              </template>
              <span>{{ item.name }}</span>
            </v-tooltip>
          </v-card-title>

          <v-card-subtitle>
            <v-tooltip location="bottom">
              <template #activator="{ props }">
                <span v-bind="props">
                  {{ item.description }}
                </span>
              </template>
              <span>{{ item.description }}</span>
            </v-tooltip>
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              <span
                v-if="item.price && !item.product_prices.length"
                class="mt-1 text-body-2 font-weight-black"
                >{{ commerce.currency ? commerce.currency.symbol + " " : ""
                }}{{ item.price }}</span
              >

              <v-chip
                v-for="product_price in item.product_prices"
                :key="product_price.id"
                class="v-chip-h--inherit ma-1 text-center"
                variant="outlined"
                label
              >
                <span v-if="product_price.name" class="mr-3"
                  >{{ product_price.name ? product_price.name + " " : "" }}
                </span>
                <span v-if="product_price.price">
                  {{ commerce.currency ? commerce.currency.symbol + " " : ""
                  }}{{ product_price.price }}
                </span>
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-container>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Commerce, Product } from "~/interfaces/commerce";

const commerce = useState<Commerce>("commerce");

const selection = ref();

const props = defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});

const emit = defineEmits(["onOpenSelectedItemDialog"]);

function openSelectedItemDialog(id: number) {
  emit("onOpenSelectedItemDialog", id);
}
</script>

<style scoped lang="scss">
.v-card-subtitle {
  white-space: inherit;

  span {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
