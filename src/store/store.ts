import { configureStore } from "@reduxjs/toolkit";

import menuSlice from "./slices/menuSlice";
import signUpUserSlice from "./slices/signUpUserSlice";
import snackbarReducer from "./slices/appSnackbarSlice";
import menuCategorySlice from "./slices/menuCategorySlice";
import appSlice from "./slices/appSlice";
import companyReducer from "./slices/companySlice";
import menuCategoryMenuReducer from "./slices/menuCategoryMenuSlice";
import locationReducer from "./slices/locationSlice";
import tableReducer from "./slices/tableSlice";
import disableLocationMenuCategoryReducer from "./slices/disableLocationMenuCategorySlice";
import disableLocationMenuReducer from "./slices/disableLocationMenuSlice";
import addonCategoryReducer from "./slices/addonCategorySlice";
import addonReducer from "./slices/addonSlice";
import MenuAddonCategoryReducer from "./slices/menuAddonCategorySlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

// ...

//
export const store = configureStore({
  reducer: {
    app: appSlice,
    menuAdd: menuSlice,
    user: signUpUserSlice,
    showSnack: snackbarReducer,
    addonCategory: addonCategoryReducer,
    menuAddonCategory: MenuAddonCategoryReducer,
    menuCategory: menuCategorySlice,
    menuCategoryMenu: menuCategoryMenuReducer,
    location: locationReducer,
    company: companyReducer,
    addon: addonReducer,
    table: tableReducer,
    disableLocationMenuCategory: disableLocationMenuCategoryReducer,
    disableLocationMenu: disableLocationMenuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
