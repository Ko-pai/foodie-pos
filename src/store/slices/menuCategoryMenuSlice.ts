import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginUser, User } from "../../types/user";
import { MenuCategoryMenuSlice } from "@/types/menuCategoryMenu";
import { MenuCategoryMenu } from "@prisma/client";

const initialState: MenuCategoryMenuSlice = {
  menuCategoryMenus: [],
  isLoading: false,
  error: null,
};

const menuCategoryMenuSlice = createSlice({
  name: "menucategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenu: (state, action: PayloadAction<MenuCategoryMenu[]>) => {
      state.menuCategoryMenus = action.payload;
    },
    addMenuCategoryMenu: (state, action: PayloadAction<any[]>) => {
      const newArray = action.payload;

      const updateMenuCategoryMenu = [...state.menuCategoryMenus, ...newArray];

      return {
        ...state,
        menuCategoryMenus: updateMenuCategoryMenu,
      };
    },
  },
});

export const { setMenuCategoryMenu ,addMenuCategoryMenu } = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;
