import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { toast } from 'react-toastify';

// Async thunk fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await userApi.getProfile();
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Fetch users failed");
        return thunkAPI.rejectWithValue(
          error.message || "Something went wrong"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchUsersPaginated = createAsyncThunk(
  "users/fetchUsersPaginated",
  async ({ page, limit, search, role, status }: UserSearch , thunkAPI) => {
    try {
      const skip = (page - 1) * limit;
      let query = `/users/pagination?skip=${skip}&limit=${limit}`;
      if (search) query += `&search=${search}`;
      if (role !== undefined) query += `&role_id=${role}`;
      if (status !== undefined) query += `&is_active=${status}`;
      const response = await userApi.getUsersPaginated(query);
      return response.data;
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ data }: { data: UserWithoutPassword }, thunkAPI) => {
    try {
      const response = await userApi.updateUser(data);
      toast.success("Update user successfully");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message || "Update user failed"}`);
        return thunkAPI.rejectWithValue(
          error.message || "Something went wrong"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, thunkAPI) => {
    try {
      const response = await userApi.deleteUser(id);
      toast.success("Deactive user successfully");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message || "Deactive user failed"}`);
        return thunkAPI.rejectWithValue(
          error.message || "Something went wrong"
        );
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
