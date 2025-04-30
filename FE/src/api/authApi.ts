import axiosClient from "./axiosClient";

const authApi = {
  register: (data: UserRegister) => axiosClient.post("/register/", data),
};

export default authApi;
