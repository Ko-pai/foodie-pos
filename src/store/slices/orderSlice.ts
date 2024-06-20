import { OrderSlice } from "@/types/order";
import { Order } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: OrderSlice = {
  orders: [],
  isLoading: false,
  error: null,
};

const createOrder = createSlice({
  name: "order",
  initialState,
  reducers: {
    setisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setisLoading, setOrder } = createOrder.actions;

export default createOrder.reducer;
