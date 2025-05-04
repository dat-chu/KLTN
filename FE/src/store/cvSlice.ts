/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import {uploadFile, getCVApplications} from './cvThunk';

interface UserState {
    myCVApplications: any[];
    loading: boolean;
    error: string | null;
    loadingCV: boolean
}

const initialState: UserState = {
    myCVApplications: [],
    loading: false,
    error: null,
    loadingCV: false
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
    }
});

export default cv.reducer;