<template>
  <div class="d-flex flex-column pb-16 max-h-100 max-h-100-v">
    <div class="position-fixed z-1 top-1 left-1">
      <v-btn
        small
        icon="mdi-arrow-left"
        nuxt
        variant="flat"
        :to="
          localeRoute({
            name: 'commerce',
            params: { commerce: commerce.name },
          })
        "
      />
    </div>

    <v-card class="flex-0-0" :loading="loading">
      <v-img
        cover
        height="150"
        :src="`${item.avatar_dirname}${item.avatar ?? ''}`"
        :class="{ disabled: item.disabled }"
      />

      <v-card-title>{{ item.name }}</v-card-title>

      <v-card-text>
        <div class="text-subtitle-1">
          <span class="font-weight-bold"> ${{ item.price }} </span>
        </div>

        <div class="description-container">
          <span v-html="item.description"/>
        </div>
      </v-card-text>
    </v-card>

    <v-container class="overflow-y-auto">
      <v-card class="mb-4">
        <div class="d-flex justify-space-between align-center">
          <v-card-title>Unidades</v-card-title>

          <div class="mr-2">
            <v-btn-toggle>
              <v-btn
                icon="mdi-minus"
                variant="text"
                size="small"
                @click="removeOneItem"
              />

              <v-btn size="small">
                <span class="text-h6">{{ quantity }}</span>
              </v-btn>

              <v-btn
                icon="mdi-plus"
                variant="text"
                size="small"
                @click="addOneItem"
              />
            </v-btn-toggle>
          </div>
        </div>
      </v-card>

      <!-- Options -->
      <template v-if="item.product_options_groupes">
        <v-card
          v-for="groupe in item.product_options_groupes"
          :key="groupe.id"
          class="mb-4"
        >
          <v-card-title>{{ groupe.name }}</v-card-title>

          <v-card-subtitle>
            {{ groupe.description }}
          </v-card-subtitle>

          <v-card-text>
            <v-form v-model="valid">
              <!-- To select just one item -->
              <template v-if="groupe.required">
                <v-radio-group v-model="form[groupe.id]">
                  <v-radio
                    v-for="option in groupe.product_options"
                    :key="option.id"
                    :label="option.name"
                    :value="option"
                  />
                </v-radio-group>
              </template>

              <!-- To select multiple items -->
              <template v-else-if="groupe.multiple">
                <v-checkbox
                  v-for="option in groupe.product_options"
                  :key="option.id"
                  :label="option.name"
                  :value="option"
                  @change="onChangeCheckbox(option)"
                />
              </template>

              <!-- To select the number of items. Usefull for products like docena de empanadas -->
              <template v-else-if="groupe.countable">
                <template
                  v-for="option in groupe.product_options"
                  :key="option.id"
                >
                  <div class="d-flex justify-space-between mb-2">
                    <span>{{ option.name }}</span>

                    <v-btn-toggle>
                      <v-btn
                        size="x-small"
                        icon="mdi-minus"
                        variant="text"
                        @click="removeOneOption(option)"
                      />

                      <v-btn size="x-small">
                        <span class="text-subtitle-2">
                          {{
                            form[option.product_options_groupe_id] &&
                            form[option.product_options_groupe_id][option.id]
                              ? form[option.product_options_groupe_id][
                                  option.id
                                ].quantity
                              : 0
                          }}
                        </span>
                      </v-btn>

                      <v-btn
                        icon="mdi-plus"
                        variant="text"
                        size="x-small"
                        @click="addOneOption(option)"
                      />
                    </v-btn-toggle>
                  </div>
                </template>
              </template>
            </v-form>
          </v-card-text>
        </v-card>
      </template>

      <v-card class="mb-auto">
        <v-card-title>¿Necesitas aclarar algo?</v-card-title>

        <v-card-text>
          <v-textarea
            v-model="note"
            label="Notas al producto"
            counter
            rows="1"
          />
        </v-card-text>
      </v-card>
    </v-container>

    <ProductActionButton
      :disabled="disabled"
      :loading="loading"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { CartProduct } from "~/interfaces/cart";
import type { Commerce } from "~/interfaces/commerce";
import type { Product, ProductOption } from "~/interfaces/product";

const localeRoute = useLocaleRoute();

const commerce = useState<Commerce>("commerce");
const cart = useState<CartProduct[]>("cart");

const props = defineProps({
  item: {
    type: Object as PropType<Product>,
    required: true,
  },
  loading: Boolean,
});

const note = ref("");
const quantity = ref(1);
const valid = ref(true);

const disabled = computed(() => !quantity.value);

function addOneItem() {
  ++quantity.value;
}
function removeOneItem() {
  if (!quantity.value) return;

  --quantity.value;
}

type FormType = Record<
  string | number, // Group ID
  ProductOption[] | Record<string | number, ProductOption> // Array for checkboxes, object for options with quantity
>;

const form = ref<FormType>({});

async function addToCart() {
  cart.value.push({
    ...props.item,
    quantity: quantity.value,
    note: note.value,
    options: form.value,
  });

  const route = localeRoute({
    name: "commerce",
    params: { commerce: commerce.value.name },
  });

  if (route) {
    return navigateTo(route);
  }
}

function onChangeCheckbox(option: ProductOption) {
  const groupId = option.product_options_groupe_id;

  // Ensure the group exists as an array
  if (!Array.isArray(form.value[groupId])) {
    form.value[groupId] = [];
  }

  // Cast the group to an array since we know it's an array now
  const optionsGroup = form.value[groupId] as ProductOption[];

  const index = optionsGroup.findIndex((e) => e.id === option.id);

  form.value[groupId] =
    index >= 0
      ? optionsGroup.filter((_, i) => i !== index) // Remove the option if it's already selected
      : [...optionsGroup, option]; // Add the option if it's not already selected
}

function addOneOption(option: ProductOption) {
  if (!form.value[option.product_options_groupe_id]) {
    form.value[option.product_options_groupe_id] = {};
  }

  !form.value[option.product_options_groupe_id][option.id]
    ? (form.value = {
        ...form.value,
        [option.product_options_groupe_id]: {
          ...form.value[option.product_options_groupe_id],
          [option.id]: {
            ...option,
            quantity: 1,
          },
        },
      })
    : form.value[option.product_options_groupe_id][option.id].quantity++;
}

function removeOneOption(option: ProductOption) {
  if (form.value[option.product_options_groupe_id][option.id].quantity > 1) {
    form.value[option.product_options_groupe_id][option.id].quantity--;
    return;
  }

  delete form.value[option.product_options_groupe_id][option.id];

  form.value[option.product_options_groupe_id] = {
    ...form.value[option.product_options_groupe_id],
  };
}
</script>

<style lang="scss" scoped>
.description-container {
  max-height: 35vh;
  overflow-y: auto;
}

.top-1 {
  top: 1rem;
}
.left-1 {
  left: 1rem;
}
</style>
