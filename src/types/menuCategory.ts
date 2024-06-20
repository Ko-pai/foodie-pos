import { BaseOption } from "./user";

export interface BaseMenuCategory {}

export interface CreateMenuCategory extends BaseOption {
  name: string;
  isAvaliable: boolean;
  companyId?: Number;
}

export interface UpdateMenuCategory extends BaseOption {
  id: number;
  name?: String;
  isAvaliable?: boolean;
  locationId?: number;
}
export interface DeleteMenuCategoryPayload extends BaseOption {
  id: number;
}
