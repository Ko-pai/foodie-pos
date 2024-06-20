import { Company } from "@prisma/client";
import { BaseOption } from "./user";

export interface CompanySlice {
  company: Company | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateCompany extends Company, BaseOption {}
