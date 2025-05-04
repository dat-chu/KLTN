/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import cvApi from '../api/cvApi';
import { toast } from 'react-toastify';


export const uploadFile = createAsyncThunk(
    'cv/uploadFile',
    async ({data, id}: {data: FormData, id: number}, thunkAPI) => {
        try {
            const response = await cvApi.uploadFile({data, id});
            toast.success('Upload file successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getCVApplications = createAsyncThunk(
    'cv/getCVApplications',
    async (_, thunkAPI) => {
        try {
            const response = await cvApi.getCVApplications();
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const compareCVJD = createAsyncThunk(
    'cv/compareCVJD',
    async (data: {cv: string, jd: string}, thunkAPI) => {
        try {
            const response = await cvApi.compareCVJD(data);
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
