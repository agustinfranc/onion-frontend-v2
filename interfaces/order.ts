export interface Order {
  address: Object;
  branch: Object | null;
  note: string;
  payMethod: Object;
  deliveryMethod: Object | null;
  client: {
    name: string | null;
  };
}
