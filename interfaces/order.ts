import type { CommerceBranch } from "./commerce";

export interface Order {
  address: OrderAddress;
  branch: CommerceBranch | null;
  note: string;
  payMethod: PayMethod;
  deliveryMethod: DeliveryMethod | null;
  client: {
    name: string | null;
  };
}

export interface OrderAddress {
  address: string;
  floor: string;
  description: string;
}

export interface PayMethod {
  id: number;
  name: string;
  disabled: boolean;
  subtitle?: string;
}

export interface DeliveryMethod {
  id: number;
  name: string;
  disabled: boolean;
  selectedTimeOption: string | undefined;
}
