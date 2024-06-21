import { ORDERSTATUS, Order } from "@prisma/client";
import { BaseOption } from "./user";
import { CartItem } from "./cart";

export interface OrderSlice {
  items: Order[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateOrderOptions extends BaseOption {
  tableId: number;
  cartItem: CartItem[];
}

export interface UpdateOrderOptions extends BaseOption {
  tableId: number;
  status: ORDERSTATUS;
}

export interface RefreshOrderOptions extends BaseOption {
  orderseq: string;
}
