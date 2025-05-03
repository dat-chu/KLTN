/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import favoriteJobApi from '../api/favoriteJobApi';
import { toast } from 'react-toastify';

export const getFavoriteJobs = createAsyncThunk(
    'favoriteJob/getFavoriteJobs',
    async (_, thunkAPI) => {
        try {
            const response = await favoriteJobApi.getFavoriteJobs();
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const postFavoriteJob = createAsyncThunk(
    'favoriteJob/createFavoriteJob',
    async (id: number, thunkAPI) => {
        try {
            const response = await favoriteJobApi.postFavoriteJob(id);
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteFavoriteJob = createAsyncThunk(
    'favoriteJob/deleteFavoriteJob',
    async (id: number, thunkAPI) => {
        try {
            const response = await favoriteJobApi.deleteFavoriteJob(id);
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
