import { Table } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (error?: any) => void;
}

export interface TableSlice extends BaseOption {
  tables: Table[];
  isLoading: boolean;
  error: Error | null;
}

export interface CreateTable extends BaseOption {
  name: string;
  locationId: number | undefined;
  assetUrl?: string;
}

export interface UpdateTable extends Table, BaseOption {}
export interface DeleteTable extends BaseOption {
  id: number;
}
