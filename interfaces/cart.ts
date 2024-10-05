import type { Product } from "./product";

export interface CartProduct extends Product {
  quantity: number;
  note?: string;
  options?: FormType;
}

type FormType = Record<
  string | number, // Group ID
  ProductOption[] | Record<string | number, ProductOption> // Array for checkboxes, object for options with quantity
>;
