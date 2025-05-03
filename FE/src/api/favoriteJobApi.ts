import axiosClient from "./axiosClient";

const favoriteJobApi = {
    getFavoriteJobs: () => axiosClient.get("/favorite-jobs"),
    deleteFavoriteJob: (id: number) => axiosClient.delete(`/favorite-jobs/${id}`),
    postFavoriteJob: (id: number) => axiosClient.post(`/favorite-jobs/create/${id}`),
};

export default favoriteJobApi;
