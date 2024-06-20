import { DisableLocationMenu, MenuCategoryMenu } from "@prisma/client";

export interface DisableLocationMenuSlice {
  disableLocationMenus: DisableLocationMenu[];
  isLoading: boolean;
  error: Error | null;
}
