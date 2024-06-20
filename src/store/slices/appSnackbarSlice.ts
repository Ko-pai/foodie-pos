import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackBarType = "error" | "success";

interface SnackBarSlice {
  type: SnackBarType;
  open: boolean;
  message: string;
}

const initialState: SnackBarSlice = {
  type: "success",
  open: false,
  message: "",
};

const SnackBarSlice = createSlice({
  name: "SnackBar",
  initialState,
  reducers: {
    showSnackBar: (
      state,
      action: PayloadAction<{ type: SnackBarType; message: string }>
    ) => {
      const { type, message } = action.payload;
      state.open = true;
      state.message = message;
      state.type = type;
    },
    hideSnackBar: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showSnackBar, hideSnackBar } = SnackBarSlice.actions;

export default SnackBarSlice.reducer;
