import type { Commerce, Rubro } from "~/interfaces/commerce";

export function useStore(key: "search" | "filteredCategories") {
  const commerce = useState<Commerce>("commerce");
  const search = useState<string>("search");

  const filteredCategories: ComputedRef<Rubro[]> = computed(() => {
    if (!search.value || !commerce.value.rubros)
      return commerce.value.rubros || [];

    return commerce.value.rubros
      .map((rubro) => ({
        ...rubro,
        subrubros: rubro.subrubros.map((subrubro) => ({
          ...subrubro,
          products: subrubro.products.filter((product) =>
            product.name.toLowerCase().includes(search.value)
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

  const state = {
    search,
    filteredCategories,
  };

  return state[key];
}
