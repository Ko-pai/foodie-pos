import { config } from "@/config";
import { CreateOrderOptions, OrderSlice } from "@/types/order";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: OrderSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createOrderSlice = createAsyncThunk(
  "order/createOrder",
  async (options: CreateOrderOptions, thunkApi) => {
    const { tableId, cartItem, onError, onSuccess } = options;

    try {
      const response = await fetch(`${config.orderApiBaseUrl}/orders`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ tableId, cartItem }),
      });
      const data = await response.json();

      const { orders } = data;
      thunkApi.dispatch(orders);
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
    }
  }
);

const createOrder = createSlice({
  name: "order",
  initialState,
  reducers: {
    setisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setisLoading, setOrder } = createOrder.actions;

export default createOrder.reducer;
