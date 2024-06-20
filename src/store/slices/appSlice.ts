import { config } from "@/config";
import {
  AppSlice,
  GetAppDataOption,
  UploadAssetImagePayload,
} from "@/types/app";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCategory } from "./menuCategorySlice";
import { stat } from "fs";
import { setCompany } from "./companySlice";
import { setMenuCategoryMenu } from "./menuCategoryMenuSlice";
import { setLocation } from "./locationSlice";
import { Location } from "@prisma/client";
import { setDisableLocationMenuCategory } from "./disableLocationMenuCategorySlice";
import { setTable } from "./tableSlice";
import { setDisableLocationMenu } from "./disableLocationMenuSlice";
import { setAddonCategory } from "./addonCategorySlice";
import { setMenuAddonCategory } from "./menuAddonCategorySlice";
import { setAddon } from "./addonSlice";
import { useAppSelector } from "../hook";
import { RootState } from "../store";

const initialState: AppSlice = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const uploadAssetImage = createAsyncThunk(
  "app/imageAsset",
  async (payload: UploadAssetImagePayload, thunkApi) => {
    const { file, onSuccess } = payload;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${config.backofficeApiBaseUrl}/asset`, {
      method: "POST",

      body: formData,
    });
    const dataFromServer = await response.json();
    const { assetUrl } = dataFromServer;

    onSuccess && onSuccess(assetUrl);
  }
);

export const createApp = createAsyncThunk(
  "app/data",
  async (option: GetAppDataOption, thunkApi) => {
    thunkApi.dispatch(setIsLoading(true));
    const { tableId } = option;
    const fetchApi = tableId
      ? `${config.orderApiBaseUrl}/app?tableId=${tableId}`
      : `${config.backofficeApiBaseUrl}/app`;
    const response = await fetch(fetchApi);
    const data = await response.json();
    const {
      menus,
      menuCategory,
      company,
      menuCategoryMenu,
      locations,
      disableLocationMenuCategory,
      table,
      addon,
      addOnCategories,
      menuAddOnCategories,
      disableLocationMenu,
    } = data;
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setMenuCategory(menuCategory));
    thunkApi.dispatch(setCompany(company));
    thunkApi.dispatch(setMenuCategoryMenu(menuCategoryMenu));
    thunkApi.dispatch(setLocation(locations));
    thunkApi.dispatch(setAddonCategory(addOnCategories));
    thunkApi.dispatch(setMenuAddonCategory(menuAddOnCategories));
    thunkApi.dispatch(setAddon(addon));
    thunkApi.dispatch(setTable(table));
    thunkApi.dispatch(
      setDisableLocationMenuCategory(disableLocationMenuCategory)
    );
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenu));
    const selectedLocationIdFromLocalStorage =
      localStorage.getItem("selectedLocationId");
    if (selectedLocationIdFromLocalStorage) {
      const locationId = locations.find(
        (item: any) => item.id === Number(selectedLocationIdFromLocalStorage)
      );
      thunkApi.dispatch(setSelectedLocation(locationId));
    } else {
      thunkApi.dispatch(setSelectedLocation(locations[0]));
    }
    thunkApi.dispatch(setInit(true));
    thunkApi.dispatch(setIsLoading(false));
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInit, setSelectedLocation, setIsLoading } = appSlice.actions;

export const appSelector = (state: RootState) => {
  return {
    init : state.app.init,
    selectedLocation: state.app.selectedLocation,
    menuCategories: state.menuCategory.menuCategories,
    menus: state.menuAdd.menu,
    locations: state.location.locations,
    addonCategories: state.addonCategory.addonCategories,
    addons: state.addon.addons,
    disableLocationMenuCategories:
      state.disableLocationMenuCategory.disableLocationMenuCategories,
    disableLocationMenus: state.disableLocationMenu.disableLocationMenus,
    tables: state.table.tables,
    company: state.company.company,
    menuCategoriesMenus: state.menuCategoryMenu.menuCategoryMenus,
    menuAddonCategories: state.menuAddonCategory.menuAddonCategories,
  };
};

export default appSlice.reducer;
