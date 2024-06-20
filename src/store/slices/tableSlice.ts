import { config } from "@/config";
import { AppSlice } from "@/types/app";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCategory } from "./menuCategorySlice";
import { stat } from "fs";
import { CompanySlice } from "@/types/company";
import { Company, Table } from "@prisma/client";
import {
  CreateTable,
  DeleteTable,
  TableSlice,
  UpdateTable,
} from "@/types/table";
import { Payload } from "@prisma/client/runtime/library";

const initialState: TableSlice = {
  tables: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async function (payload: CreateTable, thunkApi) {
    const response = await fetch(`${config.backofficeApiBaseUrl}/table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const { table } = data;

    payload.onSuccess && payload.onSuccess();
    return table
  }
);
export const updateTable = createAsyncThunk(
  "table/updateTable",
  async function (payload: UpdateTable, thunkApi) {
    const response = await fetch(`${config.backofficeApiBaseUrl}/table`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const { table } = data;

    payload.onSuccess && payload.onSuccess();
    thunkApi.dispatch(replaceTable(table));
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async function (payload: DeleteTable, thunkApi) {
    const { id } = payload;
    const response = await fetch(
      `${config.backofficeApiBaseUrl}/table?id=${id}`,
      {
        method: "DELETE",
      }
    );

    payload.onSuccess && payload.onSuccess();
    thunkApi.dispatch(removeTable(id));
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.map((d) =>
        d.id === action.payload.id ? action.payload : d
      );
    },
    removeTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter((d) =>
        d.id === action.payload ? false : true
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTable.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.tables = [...state.tables, action.payload];
        state.isLoading = false;
      })
      .addCase(createTable.rejected, (state) => {
        state.isLoading = false;
        state.error = new Error("Error occured in server");
      });
  },
});

export const { setTable, addTable, replaceTable, removeTable } =
  tableSlice.actions;

export default tableSlice.reducer;
