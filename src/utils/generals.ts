import { CartItem } from "@/types/cart";

export const getTotalPriceCartItem = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((accu, item) => {
    const menuPrice = item.menu.price;
    const totalAddonPrice = item.addon.reduce(
      (addonPrice, addon) => (addonPrice += addon.price),
      0
    );

    accu += (menuPrice + totalAddonPrice) * item.quantity;
    return accu;
  }, 0);
  return totalPrice;
};
