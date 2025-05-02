/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { programmingLanguageApi, jobPositionApi } from '../api/jobApi';
import { toast } from 'react-toastify';

export const getProgrammingLanguages = createAsyncThunk(
    'job/getProgrammingLanguages',
    async (_, thunkAPI) => {
        try {
            const response = await programmingLanguageApi.getProgrammingLanguages();
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createProgrammingLanguage = createAsyncThunk(
    'job/createProgrammingLanguage',
    async (data: ProgrammingLanguage, thunkAPI) => {
        try {
            const response = await programmingLanguageApi.createProgrammingLanguage(data);
            toast.success('Create programming language successfully');
            return response.data;
        } catch (error: any) {
            console.log("check error", error)
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateProgrammingLanguage = createAsyncThunk(
    'job/updateProgrammingLanguage',
    async (data: ProgrammingLanguage, thunkAPI) => {
        try {
            const response = await programmingLanguageApi.updateProgrammingLanguage(data);
            toast.success('Update programming language successfully');
            return response.data;
        } catch (error: any) {
            console.log("check error", error)
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteProgrammingLanguage = createAsyncThunk(
    'job/deleteProgrammingLanguage',
    async (id: number, thunkAPI) => {
        try {
            const response = await programmingLanguageApi.deleteProgrammingLanguage(id);
            toast.success('Delete programming language successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getJobPositions = createAsyncThunk('job/getJobPositions', async (_, thunkAPI) => {
    try {
        const response = await jobPositionApi.getJobPositions();
        return response.data;
    } catch (error: any) {
        toast.error(error.response.data.detail);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createJobPosition = createAsyncThunk(
    'job/createJobPosition',
    async (data: JobPosition, thunkAPI) => {
        try {
            const response = await jobPositionApi.createJobPosition(data);
            toast.success('Create job position successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateJobPosition = createAsyncThunk(
    'job/updateJobPosition',
    async (data: JobPosition, thunkAPI) => {
        try {
            const response = await jobPositionApi.updateJobPosition(data);
            toast.success('Update job position successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteJobPosition = createAsyncThunk(
    'job/deleteJobPosition',
    async (id: number, thunkAPI) => {
        try {
            const response = await jobPositionApi.deleteJobPosition(id);
            toast.success('Delete job position successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
