import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authThunk";

interface AuthState {
  user: UserLoginResponse;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    access_token: "",
    token_type: "",
    refresh_token: "",
    user: {
      id: 0,
      name: "",
      email: "",
      password: "",
      role_id: 3,
      is_active: false,
    },
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login user payload", action);
        state.loading = false;
        state.user = action.payload as UserLoginResponse;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
