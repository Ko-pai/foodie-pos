import { DisableLocationMenuCategory, MenuCategoryMenu } from "@prisma/client";

export interface DisableLocationMenuCategorySlice {
  disableLocationMenuCategories: DisableLocationMenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
