/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { programmingLanguageApi, jobPositionApi, jobDescriptionApi } from '../api/jobApi';
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
            console.log('check error', error);
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
            console.log('check error', error);
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

export const getJobPositionById = createAsyncThunk(
    'job/getJobPositionById',
    async (id: number, thunkAPI) => {
        try {
            const response = await jobPositionApi.getJobPositionById(id);
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

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

// Job Description
export const getJobDescriptions = createAsyncThunk(
    'job/getJobDescriptions',
    async ({ page, limit, level, status, search }: JobFilter, thunkAPI) => {
        try {
            const skip = (page - 1) * limit;
            let query = `/job-descriptions?skip=${skip}&limit=${limit}`;
            if (level && level !== 'undefined') query += `&level=${level}`;
            if (status && status !== 'undefined') query += `&status=${status}`;
            if (search) query += `&search=${search}`;

            const response = await jobDescriptionApi.getJobDescriptions(query);
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail || 'Failed to fetch jobs');
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchJobsByCurrentUser = createAsyncThunk(
    'job/fetchJobsByCurrentUser',
    async ({ page, limit, level, status, search }: JobFilter, thunkAPI) => {
        try {
            const skip = (page - 1) * limit;
            let query = `/job-descriptions/created_by?skip=${skip}&limit=${limit}`;
            if (level !== undefined) query += `&level=${level}`;
            if (status !== undefined) query += `&status=${status}`;
            if (search) query += `&search=${search}`;

            const response = await jobDescriptionApi.getJobDescriptionByCreatedBy(query);
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail || 'Failed to fetch jobs');
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getJobDescriptionById = createAsyncThunk(
    'job/getJobDescriptionById',
    async (id: number, thunkAPI) => {
        try {
            const response = await jobDescriptionApi.getJobDescriptionById(id);
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createJobDescription = createAsyncThunk(
    'job/createJobDescription',
    async (data, thunkAPI) => {
        try {
            const response = await jobDescriptionApi.createJobDescription(data);
            toast.success('Create job description successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateJobDescription = createAsyncThunk(
    'job/updateJobDescription',
    async (data, thunkAPI) => {
        try {
            const response = await jobDescriptionApi.updateJobDescription(data);
            toast.success('Update job description successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteJobDescription = createAsyncThunk(
    'job/deleteJobDescription',
    async (id: number, thunkAPI) => {
        try {
            const response = await jobDescriptionApi.deleteJobDescription(id);
            toast.success('Delete job description successfully');
            return response.data;
        } catch (error: any) {
            toast.error(error.response.data.detail);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
