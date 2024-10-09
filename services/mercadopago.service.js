export class MercadopagoService {
  static async generatePaymentLink({ cart, order }) {
    const items = this.getItems(cart);
    const data = {
      items,
      commerce_branch: order.branch.id,
    };

    const url =
      (process.env.API_URL || process.env.NUXT_PUBLIC_API_BASE) +
      "checkout/preferences";
    const res = await $fetch.post(url, data);
    return res.data;
  }

  static getItems(cart) {
    return cart.map((product) => ({
      title: product.name,
      quantity: product.quantity,
      unit_price: product.price,
    }));
  }
}
