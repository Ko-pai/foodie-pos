import { Order } from "@prisma/client";

export interface OrderSlice {
  orders: Order[];
  isLoading: boolean;
  error: Error | null;
}
