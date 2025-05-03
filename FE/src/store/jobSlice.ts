import { createSlice } from '@reduxjs/toolkit';
import {
    getProgrammingLanguages,
    createProgrammingLanguage,
    updateProgrammingLanguage,
    deleteProgrammingLanguage,
    getJobPositions,
    createJobPosition,
    getJobPositionById,
    updateJobPosition,
    deleteJobPosition,
    createJobDescription,
    getJobDescriptions,
    fetchJobsByCurrentUser,
    deleteJobDescription,
    getJobDescriptionById,
} from './jobThunk';

interface JobState {
    programmingLanguages: ProgrammingLanguage[];
    jobPositions: JobPosition[];
    loading: boolean;
    error: string | null;
    jobs: JobDescription[];
    total: number;
    jobById: object;
    jobPositionById: object;
}

const initialState: JobState = {
    programmingLanguages: [],
    jobPositions: [],
    loading: false,
    error: null,
    jobs: [],
    total: 0,
    jobById: {},
    jobPositionById: {},
};

const jobSlice = createSlice({
    name: 'jobs',
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
        builder
            .addCase(createJobDescription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJobDescription.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createJobDescription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(getJobDescriptions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobDescriptions.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload.jobs as JobDescription[];
                state.total = action.payload.total as number;
            })
            .addCase(getJobDescriptions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            .addCase(fetchJobsByCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobsByCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                const copy_jobs = action.payload.jobs.map((job) => ({
                    id: job.id,
                    createdBy: job.created_by,
                    position: job.job_position_id,
                    title: job.title,
                    description: job.description,
                    experienceYear: job.experience_year,
                    level: job.level,
                    workingType: job.working_type,
                    contractType: job.contract_type,
                    salaryMin: job.salary_min,
                    salaryMax: job.salary_max,
                    status: job.status,
                    endDate: job.end_date,
                    programmingLanguages: job.programming_languages
                }));
                state.jobs = copy_jobs
                state.total = action.payload.total as number;
            })
            .addCase(fetchJobsByCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(deleteJobDescription.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteJobDescription.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.jobs.findIndex((job) => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobs.splice(index, 1);
                }
            })
            .addCase(deleteJobDescription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(getJobDescriptionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobDescriptionById.fulfilled, (state, action) => {
                state.loading = false;
                state.jobById = action.payload;
            })
            .addCase(getJobDescriptionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(getJobPositionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobPositionById.fulfilled, (state, action) => {
                state.loading = false;
                state.jobPositionById = action.payload;
            })
            .addCase(getJobPositionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
        })
    },
});

export default jobSlice.reducer;
