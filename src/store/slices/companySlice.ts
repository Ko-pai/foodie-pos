import { config } from "@/config";
import { AppSlice } from "@/types/app";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCategory } from "./menuCategorySlice";
import { stat } from "fs";
import { CompanySlice, UpdateCompany } from "@/types/company";
import { Company } from "@prisma/client";

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  error: null,
};

export const updateCompanyToServer = createAsyncThunk(
  "company/updateCompany",
  async (payload: UpdateCompany, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/company`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const { company } = data;
    thunkApi.dispatch(setCompany(company));
    payload.onSuccess && payload.onSuccess();
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
