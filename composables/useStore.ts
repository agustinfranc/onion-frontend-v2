import type { CartProduct } from "~/interfaces/cart";
import type { Commerce, Rubro } from "~/interfaces/commerce";

export function useStore(
  key: "search" | "filteredCategories" | "subtotalCalc"
) {
  const commerce = useState<Commerce>("commerce");
  const search = useState<string>("search");
  const cart = useState<CartProduct[]>("cart");

  const filteredCategories: ComputedRef<Rubro[]> = computed(() => {
    if (!search.value || !commerce.value.rubros)
      return commerce.value.rubros || [];

    return commerce.value.rubros
      .map((rubro) => ({
        ...rubro,
        subrubros: rubro.subrubros.map((subrubro) => ({
          ...subrubro,
          products: subrubro.products.filter((product) =>
            product.name.toLowerCase().includes(search.value.toLowerCase())
          ),
        })),
      })) // filtro articulos
      .map((rubro) => ({
        ...rubro,
        subrubros: rubro.subrubros.filter(
          (subrubro) => subrubro.products.length > 0
        ),
      })) // filtro subrubros
      .filter((rubro) => rubro.subrubros.length > 0); // filtro rubros
  });

  const subtotalCalc = computed(() =>
    cart.value.reduce(
      (previous, current) => previous + current.price * current.quantity,
      0
    )
  );

  const state = {
    search,
    filteredCategories,
    subtotalCalc,
  };

  return state[key];
}
