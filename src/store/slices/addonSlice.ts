import { config } from "@/config";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Addon, AddonCategory, Company } from "@prisma/client";
import {
  AddonCategorySlice,
  CreateAddonCategorySlice,
  NewAddonCategory,
  UpdateAddonCategory,
} from "@/types/addonCategory";
import { setMenuAddonCategory } from "./menuAddonCategorySlice";
import { AddonSlice, DeleteAddon, NewAddon, UpdateAddon } from "@/types/addon";

const initialState: AddonSlice = {
  addons: [],
  isLoading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (payload: NewAddon, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const { addon } = data;

    payload.onSuccess && payload.onSuccess();
    return addon;
  }
);

export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async (payload: UpdateAddon, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/addon`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const { updateAddon } = data;

    thunkApi.dispatch(replaceAddon(updateAddon));
    payload.onSuccess && payload.onSuccess();
  }
);

export const deleteAddon = createAsyncThunk(
  "addon/deleteAddon",
  async (payload: DeleteAddon, thunkApi) => {
    const { id } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon?id=${id}`,
      {
        method: "DELETE",
      }
    );

    payload.onSuccess && payload.onSuccess();
    thunkApi.dispatch(removeAddon(id));
  }
);

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddon: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = [...state.addons, action.payload];
    },
    replaceAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = state.addons.map((d) =>
        d.id === action.payload.id ? action.payload : d
      );
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.addons = state.addons.filter((d) =>
        d.id === action.payload ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddon.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAddon.fulfilled, (state, action) => {
        state.addons = [...state.addons, action.payload];
        state.isLoading = false;
      })
      .addCase(createAddon.rejected, (state) => {
        state.isLoading = false;
        state.error = new Error("Error occured in server");
      });
  },
});

export const { setAddon, addAddon, replaceAddon, removeAddon } =
  addonSlice.actions;

export default addonSlice.reducer;
