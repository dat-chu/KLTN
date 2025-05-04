/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import {uploadFile, getCVApplications, compareCVJD} from './cvThunk';

interface UserState {
    myCVApplications: any[];
    loading: boolean;
    error: string | null;
    loadingCV: boolean
    loadingCompare: boolean
}

const initialState: UserState = {
    myCVApplications: [],
    loading: false,
    error: null,
    loadingCV: false,
    loadingCompare: false
};

const cv = createSlice({
    name: 'cvs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.loadingCV = true;
                state.error = null;
            })
            .addCase(uploadFile.fulfilled, (state) => {
                state.loadingCV = false;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.loadingCV = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(getCVApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCVApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.myCVApplications = action.payload as any[];
            })
            .addCase(getCVApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(compareCVJD.pending, (state) => {
                state.loadingCompare = true;
                state.error = null;
            })
            .addCase(compareCVJD.fulfilled, (state) => {
                state.loadingCompare = false;
            })
            .addCase(compareCVJD.rejected, (state, action) => {
                state.loadingCompare = false;
                state.error = action.payload as string;
            });
    }
});

export default cv.reducer;