import axiosClient from "./axiosClient";

const authApi = {
  register: (data: UserRegister) => axiosClient.post("/auth/register/", data),
  login: (data: UserLogin) => axiosClient.post("/auth/login/", data),
};

export default authApi;
