import { config } from "@/config";
import {
  CreateMenuCategory,
  DeleteMenuCategoryPayload,
  UpdateMenuCategory,
} from "@/types/menuCategory";

import { MenuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDisableLocationMenuCategory } from "./disableLocationMenuCategorySlice";

interface MenuCategorySlice {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuCategorySlice = {
  menuCategories: [],
  isLoading: false,
  error: null,
};

export const createMenuCategoryToServer = createAsyncThunk(
  "menuCategory/newMenuCategory",
  async function fetchData(payload: CreateMenuCategory, thunkApi) {
    const { onSuccess, onError } = payload;

    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    const { menuCategory } = data;
    onSuccess && onSuccess();

    return menuCategory;
  }
);

export const updateMenuCategoryToServer = createAsyncThunk(
  "menuCategory/updateMenuCategory",
  async function fetchData(payload: UpdateMenuCategory, thunkApi) {
    const { onSuccess, onError } = payload;

    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu-category`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      }
    );
    const data = await response.json();
    const { updateMenuCategory, disabledLocationMenuCategories } = data;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceMenuCategory(updateMenuCategory));
    thunkApi.dispatch(
      setDisableLocationMenuCategory(disabledLocationMenuCategories)
    );
  }
);
export const deleteMenuCategoryFromServer = createAsyncThunk(
  "menuCategory/updateMenuCategory",
  async function fetchData(payload: DeleteMenuCategoryPayload, thunkApi) {
    const { onSuccess, id } = payload;

    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu-category?id=${id}`,
      {
        method: "DELETE",
      }
    );

    onSuccess && onSuccess();
    thunkApi.dispatch(removeMenuCategory(id));
  }
);

const menuCategory = createSlice({
  name: "MenuCategories",
  initialState,
  reducers: {
    setMenuCategory: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = [...state.menuCategories, action.payload];
    },
    replaceMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = state.menuCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenuCategory: (state, action: PayloadAction<number>) => {
      state.menuCategories = state.menuCategories.filter((menuCategory) =>
        menuCategory.id === action.payload ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenuCategoryToServer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createMenuCategoryToServer.fulfilled, (state, action) => {
        state.menuCategories = [...state.menuCategories, action.payload];
        state.isLoading = false;
      })
      .addCase(createMenuCategoryToServer.rejected, (state) => {
        state.isLoading = false;
        state.error = new Error("Error occured in server");
      });
  },
});

export const {
  setMenuCategory,
  addMenuCategory,
  removeMenuCategory,
  replaceMenuCategory,
} = menuCategory.actions;

export default menuCategory.reducer;
