import { Location } from "@prisma/client";
import { BaseOption } from "./user";

export interface AppSlice {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UploadAssetImagePayload extends BaseOption {
  file: File;
}

export interface GetAppDataOption extends BaseOption {
  tableId?: string;
}
