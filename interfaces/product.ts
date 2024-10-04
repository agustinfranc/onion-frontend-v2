export interface Product {
  id: number;
  subrubro_id: number;
  commerce_id: number;
  code: number;
  name: string;
  description: string;
  price: number;
  avatar: null;
  avatar_dirname: string;
  created_at: Date;
  updated_at: Date;
  disabled: boolean;
  subrubro: Subrubro;
  product_hashtags: any[];
  product_prices: any[];
  product_options_groupes: ProductOptionsGroupe[];

  quantity?: number;
  note?: string;
  options?: FormType;
}

export interface ProductOptionsGroupe {
  id: number;
  product_id: number;
  name: string;
  description: null;
  multiple: boolean;
  required: boolean;
  countable: boolean;
  min_count: null;
  max_count: null;
  created_at: null;
  updated_at: null;
  deleted_at: null;
  product_options: ProductOption[];
}

export interface ProductOption {
  id: number;
  product_options_groupe_id: number;
  name: string;
  description: null;
  price: null;
  created_at: null;
  updated_at: null;
  deleted_at: null;
}

export interface Subrubro {
  id: number;
  rubro_id: number;
  name: string;
  link_name: null;
  sort: number;
  is_general: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  rubro: Rubro;
}

export interface Rubro {
  id: number;
  name: string;
  link_name: string;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
}

type FormType = Record<
  string | number, // Group ID
  ProductOption[] | Record<string | number, ProductOption> // Array for checkboxes, object for options with quantity
>;
