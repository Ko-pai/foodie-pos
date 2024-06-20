import { Addon, AddonCategory } from "@prisma/client";
import { BaseOption } from "./user";

export interface AddonSlice {
  addons: Addon[];
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateAddon extends Addon, BaseOption {}

export interface NewAddon extends BaseOption {
  name: string;
  price: number;
  addonCategoryId: number | undefined;
}

export interface DeleteAddon extends BaseOption {
  id: number;
}
