import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../api/authApi';
import { toast } from 'react-toastify';
import { ROUTER } from '../helpers/constant';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: UserRegister, thunkAPI) => {
        try {
            const response = await authApi.register(userData);
            toast.success('Register successfully');
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

interface LoginUserArgs {
    userData: UserLogin;
    navigate: (path: string) => void;
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ userData, navigate }: LoginUserArgs, thunkAPI) => {
        try {
            const response = await authApi.login(userData);
            toast.success('Login successfully');
            navigate(ROUTER.HOME);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
