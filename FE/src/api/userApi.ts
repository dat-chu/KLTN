import axiosClient from "./axiosClient";

const userApi = {
  getProfile: () => axiosClient.get("/users/"),
  getUserById: (id: number) => axiosClient.get(`/users/${id}`),
  getUsersPaginated: (query_url: string) =>
    axiosClient.get(query_url),
  updateUser: (data: UserWithoutPassword) => axiosClient.put(`/users/${data.id}`, data),
  deleteUser: (id: number) => axiosClient.delete(`/users/${id}`),
};

export default userApi;
