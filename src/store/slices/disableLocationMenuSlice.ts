import { DisableLocationMenuSlice } from "@/types/disableLocationMenu";
import { DisableLocationMenu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: DisableLocationMenuSlice = {
  disableLocationMenus: [],
  isLoading: false,
  error: null,
};

const disableLocationMenu = createSlice({
  name: "disableLocationMenu",
  initialState,
  reducers: {
    setDisableLocationMenu: (
      state,
      action: PayloadAction<DisableLocationMenu[]>
    ) => {
      state.disableLocationMenus = action.payload;
    },
  },
});

export const { setDisableLocationMenu } = disableLocationMenu.actions;

export default disableLocationMenu.reducer;
