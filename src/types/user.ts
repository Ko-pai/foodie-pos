export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (error?: any) => void;
}

export interface User extends BaseOption {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginUser extends BaseOption {
  email: string;
  password: string;
}
