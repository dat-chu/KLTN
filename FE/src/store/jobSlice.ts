import { createSlice } from '@reduxjs/toolkit';
import {
    getProgrammingLanguages,
    createProgrammingLanguage,
    updateProgrammingLanguage,
    deleteProgrammingLanguage,
    getJobPositions,
    createJobPosition,
    updateJobPosition,
    deleteJobPosition,
} from './jobThunk';

interface JobState {
    programmingLanguages: ProgrammingLanguage[];
    jobPositions: JobPosition[];
    loading: boolean;
    error: string | null;
}

const initialState: JobState = {
    programmingLanguages: [],
    jobPositions: [],
    loading: false,
    error: null,
};

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProgrammingLanguages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProgrammingLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.programmingLanguages = action.payload as ProgrammingLanguage[];
            })
            .addCase(getProgrammingLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(createProgrammingLanguage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProgrammingLanguage.fulfilled, (state, action) => {
                state.loading = false;
                state.programmingLanguages.push(action.payload as ProgrammingLanguage);
            })
            .addCase(createProgrammingLanguage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(updateProgrammingLanguage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProgrammingLanguage.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.programmingLanguages.findIndex(
                    (lang) => lang.id === action.payload.id
                );
                if (index !== -1) {
                    state.programmingLanguages[index] = action.payload as ProgrammingLanguage;
                }
            })
            .addCase(updateProgrammingLanguage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(deleteProgrammingLanguage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProgrammingLanguage.fulfilled, (state, action) => {
                state.loading = false;
                state.programmingLanguages = state.programmingLanguages.filter(
                    (lang) => lang.id !== action.payload.id
                );
            })
            .addCase(deleteProgrammingLanguage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(getJobPositions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobPositions.fulfilled, (state, action) => {
                state.loading = false;
                state.jobPositions = action.payload as JobPosition[];
            })
            .addCase(getJobPositions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(createJobPosition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJobPosition.fulfilled, (state, action) => {
                state.loading = false;
                state.jobPositions.push(action.payload as JobPosition);
            })
            .addCase(createJobPosition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(updateJobPosition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateJobPosition.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.jobPositions.findIndex((job) => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobPositions[index] = action.payload as JobPosition;
                }
            })
            .addCase(updateJobPosition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(deleteJobPosition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteJobPosition.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.jobPositions.findIndex((job) => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobPositions.splice(index, 1);
                }
            })
            .addCase(deleteJobPosition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default jobSlice.reducer;
