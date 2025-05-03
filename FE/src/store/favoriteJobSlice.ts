import { createSlice } from '@reduxjs/toolkit';
import { getFavoriteJobs , postFavoriteJob, deleteFavoriteJob} from './favoriteJobThunk';

interface AuthState {
    favorites: FavoriteJob[];
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    favorites: [],
    loading: false,
    error: null,
};

const favoriteJob = createSlice({
    name: 'favoriteJob',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavoriteJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavoriteJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload as FavoriteJob[];
            })
            .addCase(getFavoriteJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(postFavoriteJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postFavoriteJob.fulfilled, (state, action) => {
                console.log("check action favorite", action.payload);
                state.loading = false;
                state.favorites.push(action.payload as FavoriteJob);
            })
            .addCase(postFavoriteJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
        .addCase(deleteFavoriteJob.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteFavoriteJob.fulfilled, (state, action) => {
            console.log("check action delete favorite", action.payload);
            state.loading = false;
            state.favorites = state.favorites.filter((job) => job.id !== action.payload.id);
        })
        .addCase(deleteFavoriteJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export default favoriteJob.reducer;
