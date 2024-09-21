export interface Subrubro {
  id: number;
  rubro_id: number;
  name: string;
  link_name: null | string;
  is_general: boolean;
  products: Product[];
  commerces: Commerce[];
}

export interface Rubro {
  id: number;
  name: string;
  link_name: string;
  pivot: RubroPivot;
  subrubros: Subrubro[];
}

export interface Commerce {
  id: number;
  name: string;
  fullname: string;
  cover_dirname: string;
  avatar_dirname: string;
  whatsapp_number: null;
  phone_number: null;
  instagram_account: string;
  facebook_account: null;
  youtube_account: null;
  tiktok_account: null;
  maps_account: null;
  dark_theme: boolean;
  has_action_buttons: boolean;
  has_footer: boolean;
  can_order: boolean;
  currency_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  branches: any[];
  currency: Currency;
  rubros: Rubro[];
  pivot?: CommercePivot;
}

export interface Product {
  id: number;
  name: string;
  description: null | string;
  price: number;
  avatar: null | string;
  avatar_dirname: null | string;
  disabled: boolean;
  commerce_id: number;
  subrubro_id: number;
  product_hashtags: ProductHashtagElement[];
  product_prices: ProductHashtagElement[];
}

export interface ProductHashtagElement {
  id: number;
  product_id: number;
  name: null | string;
  to?: string;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: null;
  price?: number;
}

export interface RubroPivot {
  commerce_id: number;
  rubro_id: number;
  sort: number;
  highlighted: number;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

export interface CommercePivot {
  subrubro_id: number;
  commerce_id: number;
  slideable: number;
}
