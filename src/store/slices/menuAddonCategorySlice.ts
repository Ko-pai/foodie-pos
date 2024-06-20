import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CompanySlice } from "@/types/company";
import { MenuAddonCategory } from "@prisma/client";

import { MenuAddonCategorySlice } from "@/types/menuAddonCategory";
import { stat } from "fs";
import { updateAddonCategory } from "./addonCategorySlice";

const initialState: MenuAddonCategorySlice = {
  menuAddonCategories: [],
  isLoading: false,
  error: null,
};

const menuAddonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setMenuAddonCategory: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = action.payload;
    },
    addMenuAddonCategory: (state, action: PayloadAction<any[]>) => {
      const newArray = action.payload;


      const updatedAddonMenuCategories = [
        ...state.menuAddonCategories,
        ...newArray,
      ];

      return {
        ...state,
        menuAddonCategories: updatedAddonMenuCategories,
      };
    },
    removeMenuAddonCategory: (state, action: PayloadAction<number>) => {
      state.menuAddonCategories = state.menuAddonCategories.filter((d) => {
        d.id === action.payload ? false : true;
      });
    },
  },
});

export const { setMenuAddonCategory, addMenuAddonCategory } =
  menuAddonSlice.actions;

export default menuAddonSlice.reducer;
