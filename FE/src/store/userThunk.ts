import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

// Async thunk fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await userApi.getProfile();
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(
          error.message || "Something went wrong"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
