import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DeleteMenu, NewMenu, UpdateMenu } from "../../types/menu";
import { config } from "@/config";
import { ErrorWhenMenuCreate } from "../../types/menu";
import { Menu } from "@prisma/client";
import { setDisableLocationMenu } from "./disableLocationMenuSlice";
import {
  addMenuCategoryMenu,
  setMenuCategoryMenu,
} from "./menuCategoryMenuSlice";

interface MenuSlice {
  menu: Menu[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuSlice = {
  menu: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",

  async (newMenu: NewMenu, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newMenu }),
    });

    const data = await response.json();
    const { menu, menuCategoryMenu, error } = data;

    if (error) {
      newMenu.onError && newMenu.onError(error);
      return thunkApi.rejectWithValue({ errorMessage: error });
    }

    newMenu.onSuccess && newMenu.onSuccess();
    thunkApi.dispatch(addMenuCategoryMenu(menuCategoryMenu));
    return menu;
  }
);
export const updateMenuToServer = createAsyncThunk(
  "menu/updateMenu",

  async (payload: UpdateMenu, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/menu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const { menu, disableLocationMenu, menuCategoryMenu } = data;

    thunkApi.dispatch(replaceMenu(menu));
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenu));
    thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenu));
    payload.onSuccess && payload.onSuccess();
  }
);

export const deleteMenuFromServer = createAsyncThunk(
  "menu/deleteMenu",

  async (payload: DeleteMenu, thunkApi) => {
    const { id, onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/menu?id=${id}`,
      {
        method: "DELETE",
      }
    );

    onSuccess && onSuccess();
    thunkApi.dispatch(removeMenu(id));
    console.log(id);
  }
);

const menuSlice = createSlice({
  name: "Menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menu = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.menu = [...state.menu, action.payload];
    },
    replaceMenu: (state, action: PayloadAction<Menu>) => {
      state.menu = state.menu.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenu: (state, action: PayloadAction<number>) => {
      state.menu = state.menu.filter((menu) =>
        menu.id === action.payload ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menu = [...state.menu, action.payload];
        state.isLoading = false;
      })
      .addCase(createMenu.rejected, (state) => {
        state.isLoading = false;
        state.error = new Error("Error occured in server");
      });
  },
});

export const { addMenu, setMenu, removeMenu, replaceMenu } = menuSlice.actions;
export default menuSlice.reducer;
