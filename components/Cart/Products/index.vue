<template>
  <div>
    <v-list nav>
      <v-list-item
        v-for="(product, index) in cart"
        :key="product.id"
        class="mb-2"
        :title="product.name"
      >
        <template #subtitle>
          <div>
            <div class="d-flex justify-space-between">
              <div>
                <span class="mt-1 text-body-2"
                  >{{ commerce.currency ? commerce.currency.symbol + " " : "$"
                  }}{{ product.price }}</span
                >

                <template v-if="product.options">
                  <template v-for="option in product.options">
                    <p
                      v-if="option.id"
                      :key="option.id"
                      class="mb-0 text-body-2"
                    >
                      {{ option.name }}
                    </p>

                    <template v-else>
                      <p
                        v-for="o in option"
                        :key="o.id"
                        class="mb-0 text-body-2"
                      >
                        {{ o.name }} {{ o.quantity ?? "" }}
                      </p>
                    </template>
                  </template>
                </template>
              </div>
            </div>
            <div>
              {{ product.note }}
            </div>
          </div>
        </template>

        <template #prepend>
          <v-avatar rounded="sm" size="large">
            <v-img
              alt="Avatar"
              :src="`${product.avatar_dirname}${
                product.avatar ? product.avatar : ''
              }`"
            />
          </v-avatar>
        </template>

        <template #append>
          <v-btn-toggle class="mr-2">
            <v-btn
              variant="outlined"
              size="small"
              @click.stop="removeOneItem(index)"
            >
              <v-icon v-if="product.quantity > 1">mdi-minus</v-icon>
              <v-icon v-else>mdi-delete</v-icon>
            </v-btn>

            <v-btn variant="outlined" size="small">
              <span>{{ product.quantity }}</span>
            </v-btn>

            <v-btn
              variant="outlined"
              size="small"
              icon="mdi-plus"
              @click.stop="addOneItem(index)"
            />
          </v-btn-toggle>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import type { CartProduct } from "~/interfaces/cart";
import type { Commerce } from "~/interfaces/commerce";

const commerce = useState<Commerce>("commerce");
const cart = useState<CartProduct[]>("cart");

async function addOneItem(index: number) {
  if (cart.value[index]) {
    cart.value[index].quantity++;
  }
}

async function removeOneItem(index: number) {
  if (!cart.value[index]) {
    return;
  }

  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--;
    return;
  }

  cart.value.splice(index, 1);
}
</script>

<style lang="scss" scoped>
:deep(.v-list) {
  .v-list-item__content {
    padding: 12px 0;
  }
}
</style>
