import { Menu } from "@prisma/client";
import { BaseOption } from "./user";

export interface BaseMenu {
  name: string;
  price: number;
  menuCategoryId?: Number[];
}

export interface ErrorWhenMenuCreate {
  id: number;
  name: string;
}

export interface NewMenu extends BaseMenu, BaseOption {
  name: string;
  price: number;
  menuCategoryId: number[];
  assetUrl?: string;
}

export interface UpdateMenu extends Menu, BaseOption {
  isAvailable?: boolean;
  locationId?: number;
  menuCategoryIds?: number[];
}

export interface DeleteMenu extends BaseOption {
  id: number;
}
