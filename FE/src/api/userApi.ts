import axiosClient from "./axiosClient";

const userApi = {
  getProfile: () => axiosClient.get("/users/"),
};

export default userApi;
