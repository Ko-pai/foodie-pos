import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginUser, User } from "../../types/user";

interface SignUpUserSlice {
  users: User | null;
  isLoading: boolean;
  error: Error | null;
}

const initialState: SignUpUserSlice = {
  users: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/signup",
  async (newUsers: User, thunkApi) => {
    const response = await fetch("http://localhost:5500/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUsers),
    });
    const data = await response.json();
    newUsers.onSuccess && newUsers.onSuccess();
  }
);

// login User
export const logUsers = createAsyncThunk(
  "user/login",
  async (validateUser: LoginUser, thunkAP) => {
    const response = await fetch("http://localhost:5500/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateUser),
    });
    const data = await response.json();

    const { token, findUser } = data;
    localStorage.setItem("token", token);
    validateUser.onSuccess && validateUser.onSuccess(findUser);
  }
);

const user = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.users = action.payload;
    },
  },
});

export const { setUser } = user.actions;

export default user.reducer;
