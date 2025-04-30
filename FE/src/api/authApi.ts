import axiosClient from "./axiosClient";

const authApi = {
  register: (data: UserRegister) => axiosClient.post("/auth/register/", data),
};

export default authApi;
