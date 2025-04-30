import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: UserRegister, thunkAPI) => {
    try {
      const response = await authApi.register(userData);
      toast.success("Register successfully");
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.detail);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
