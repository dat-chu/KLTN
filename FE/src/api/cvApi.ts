import axiosClient from "./axiosClient";

const cvApi = {
  uploadFile: ({data, id}: {data: FormData, id: number}) => axiosClient.post(`/cvs/upload/${id}`, data),
  getCVApplications: () => axiosClient.get('/cvs/my-cv-applications'),
  compareCVJD: (data: {cv: string, jd: string}) => axiosClient.post('/cvs/compare-cv-jd', data),
};

export default cvApi;
