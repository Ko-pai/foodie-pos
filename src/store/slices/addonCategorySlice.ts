import { config } from "@/config";
import { AppSlice } from "@/types/app";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCategory } from "./menuCategorySlice";
import { stat } from "fs";
import { CompanySlice } from "@/types/company";
import { AddonCategory, Company } from "@prisma/client";
import {
  AddonCategorySlice,
  CreateAddonCategorySlice,
  DeleteAddonCategorySlice,
  NewAddonCategory,
  UpdateAddonCategory,
} from "@/types/addonCategory";
import {
  addMenuAddonCategory,
  setMenuAddonCategory,
} from "./menuAddonCategorySlice";

const initialState: AddonCategorySlice = {
  addonCategories: [],
  isLoading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (payload: NewAddonCategory, thunkApi) => {
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    const { addonCategory, menuAddOnCategories } = data;

    payload.onSuccess && payload.onSuccess();

    thunkApi.dispatch(addMenuAddonCategory(menuAddOnCategories));
    return addonCategory;
  }
);

export const updateAddonCategory = createAsyncThunk(
  "addonCategory/updateAddonCategory",
  async (payload: UpdateAddonCategory, thunkApi) => {
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon-category`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    const { addonCategory, menuAddonCategories } = data;

    thunkApi.dispatch(replaceAddonCategory(addonCategory));
    thunkApi.dispatch(setMenuAddonCategory(menuAddonCategories));
    payload.onSuccess && payload.onSuccess();
  }
);

export const deleteAddonCategory = createAsyncThunk(
  "addon/deleteAddonCategory",
  async (payload: DeleteAddonCategorySlice, thunkApi) => {
    const { id } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/addon-category?id=${id}`,
      {
        method: "DELETE",
      }
    );

    payload.onSuccess && payload.onSuccess();
    thunkApi.dispatch(removeAddonCategory(id));
  }
);

const addonSlice = createSlice({
  name: "addon",
  initialState,
  reducers: {
    setAddonCategory: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = [...state.addonCategories, action.payload];
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((d) =>
        d.id === action.payload.id ? action.payload : d
      );
    },
    removeAddonCategory: (state, action: PayloadAction<number>) => {
      state.addonCategories = state.addonCategories.filter((addonCategory) =>
        addonCategory.id === action.payload ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddonCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAddonCategory.fulfilled, (state, action) => {
        state.addonCategories = [...state.addonCategories, action.payload];
        state.isLoading = false;
      })
      .addCase(createAddonCategory.rejected, (state) => {
        state.isLoading = false;
        state.error = new Error("Error occured in server");
      });
  },
});

export const {
  setAddonCategory,
  replaceAddonCategory,
  addAddonCategory,
  removeAddonCategory,
} = addonSlice.actions;

export default addonSlice.reducer;
