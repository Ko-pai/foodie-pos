import { Addon, Menu } from "@prisma/client";
import { BaseOption } from "./user";

export interface CartSlice {
  cartItems: CartItem[];
  isLoading: boolean;
  error: Error | null;
}

export interface CartItem extends BaseOption {
  id: string;
  menu: Menu;
  addon: Addon[];
  quantity: number;
}
