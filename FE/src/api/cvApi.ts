import axiosClient from "./axiosClient";

const cvApi = {
  uploadFile: ({data, id}: {data: FormData, id: number}) => axiosClient.post(`/cvs/upload/${id}`, data),
  getCVApplications: () => axiosClient.get('/cvs/my-cv-applications'),
};

export default cvApi;
