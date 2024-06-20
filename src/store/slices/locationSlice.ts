import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Location } from "@prisma/client";
import {
  CreateLocation,
  DeleteLocation,
  LocationSlice,
  UpdateLocation,
} from "@/types/location";
import { config } from "@/config";

const initialState: LocationSlice = {
  locations: [],
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createLocation",

  async (payload: CreateLocation, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    const { location } = data;

    onSuccess && onSuccess();
    return location;
  }
);
export const updateLocation = createAsyncThunk(
  "location/updateLocation",

  async (payload: UpdateLocation, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/location`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    const { location } = data;

    onSuccess && onSuccess();
    thunkApi.dispatch(replaceLocation(location));
  }
);

export const deleteLocationFromServer = createAsyncThunk(
  "location/deleteLocation",

  async (payload: DeleteLocation, thunkApi) => {
    const { id, onSuccess } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/location?id=${id}`,
      {
        method: "DELETE",
      }
    );

    onSuccess && onSuccess();
    thunkApi.dispatch(removeLocation(id));
    console.log(id);
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
    },
    removeLocation: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter((d) =>
        d.id === action.payload ? false : true
      );
    },
    replaceLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLocation.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.locations = [...state.locations, action.payload];
        state.isLoading = false;
      })
      .addCase(createLocation.rejected, (state) => {
        state.isLoading = false;
        state.error = new Error("Error occured in server");
      });
  },
});

export const { setLocation, removeLocation, addLocation, replaceLocation } =
  locationSlice.actions;

export default locationSlice.reducer;
