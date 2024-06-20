import { AddonCategory } from "@prisma/client";
import { BaseOption } from "./user";

export interface AddonCategorySlice {
  addonCategories: AddonCategory[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateAddonCategorySlice extends BaseOption {}
export interface DeleteAddonCategorySlice extends BaseOption {
  id: number;
}
export interface UpdateAddonCategory extends AddonCategory, BaseOption {
  menuIds: number[];
  companyId?: number;
  isRequired : boolean
}

export interface NewAddonCategory extends BaseOption {
  name: string;
  isRequired: boolean;
  menuIds?: number[];
}
