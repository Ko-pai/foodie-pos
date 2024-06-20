import { Location } from "@prisma/client";
import { BaseOption } from "./user";

export interface LocationSlice {
  locations: Location[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateLocation extends BaseOption {
  name: string;
  street: string;
  city: string;
  township: string;
  companyId: number | undefined;
}

export interface UpdateLocation extends Location, BaseOption {}

export interface DeleteLocation extends BaseOption {
  id: number;
}
