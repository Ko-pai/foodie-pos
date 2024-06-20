import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginUser, User } from "../../types/user";
import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { DisableLocationMenuCategory, MenuCategoryMenu } from "@prisma/client";
import { DisableLocationMenuCategorySlice } from "@/types/disableLocationMenuCategory";

const initialState: DisableLocationMenuCategorySlice = {
  disableLocationMenuCategories: [],
  isLoading: false,
  error: null,
};

const disableLocationMenuCategorySlice = createSlice({
  name: "disableLocationMenuCategory",
  initialState,
  reducers: {
    setDisableLocationMenuCategory: (
      state,
      action: PayloadAction<DisableLocationMenuCategory[]>
    ) => {
      state.disableLocationMenuCategories = action.payload;
    },

  },
});

export const {
  setDisableLocationMenuCategory,
} = disableLocationMenuCategorySlice.actions;

export default disableLocationMenuCategorySlice.reducer;
