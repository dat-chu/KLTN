import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: UserRegister, thunkAPI) => {
    try {
      const response = await authApi.register(userData);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
