import { CartItem, CartSlice } from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  cartItems: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exist = state.cartItems.find((d) => d.id === action.payload.id);
      if (exist) {
        state.cartItems = state.cartItems.map((d) =>
          d.id === action.payload.id ? action.payload : d
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },

    removeCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (d) => d.id !== action.payload.id
        
      );
      action.payload.onSuccess && action.payload.onSuccess()
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
