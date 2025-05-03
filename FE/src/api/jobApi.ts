/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from './axiosClient';

export const programmingLanguageApi = {
    getProgrammingLanguages: () => axiosClient.get('/programming-languages'),
    getProgrammingLanguageById: (id: number) => axiosClient.get(`/programming-languages/${id}`),
    createProgrammingLanguage: (data: ProgrammingLanguage) =>
        axiosClient.post('/programming-languages', data),
    updateProgrammingLanguage: (data: ProgrammingLanguage) =>
        axiosClient.put(`/programming-languages/${data.id}`, data),
    deleteProgrammingLanguage: (id: number) => axiosClient.delete(`/programming-languages/${id}`),
};

export const jobPositionApi = {
    getJobPositions: () => axiosClient.get('/job-positions'),
    getJobPositionById: (id: number) => axiosClient.get(`/job-positions/${id}`),
    createJobPosition: (data: JobPosition) => axiosClient.post('/job-positions', data),
    updateJobPosition: (data: JobPosition) => axiosClient.put(`/job-positions/${data.id}`, data),
    deleteJobPosition: (id: number) => axiosClient.delete(`/job-positions/${id}`),
};

export const jobDescriptionApi = {
    getJobDescriptions: (query: string) => axiosClient.get(query),
    getJobDescriptionById: (id: number) => axiosClient.get(`/job-descriptions/${id}`),
    getJobDescriptionByCreatedBy: (query: string) => axiosClient.get(query),
    createJobDescription: (data: any) => axiosClient.post('/job-descriptions', data),
    updateJobDescription: (data: any) => axiosClient.put(`/job-descriptions/${data.id}`, data),
    deleteJobDescription: (id: number) => axiosClient.delete(`/job-descriptions/${id}`),
};
