import axios from "axios";
import {loadFromLocalStorage, saveToLocalStorage} from "../helpers/localStorage";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Interceptor request
axiosClient.interceptors.request.use(
  (config) => {
    // token
    const {access_token, token_type}: AuthToken = loadFromLocalStorage("loginUser");
    if (access_token && config.headers) {
      config.headers.Authorization = `${token_type} ${access_token}`;
    }
    return config;
  },
  async (err) => Promise.reject(err)
);

// Interceptor response
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const storedToken = loadFromLocalStorage("loginUser");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      storedToken
    ) {
      originalRequest._retry = true;

      try {
        const { refresh_token, token_type } = storedToken as AuthToken;

        const res = await axios.post<AuthToken>(`${axiosClient.defaults.baseURL}/auth/refresh`, {
          refresh_token,
        });

        const newToken = res.data.access_token;
        const newRefreshToken = res.data.refresh_token;

        const updatedData = {
          ...storedToken,
          access_token: newToken,
          refresh_token: newRefreshToken,
        };

        saveToLocalStorage("loginUser", updatedData);

        originalRequest.headers["Authorization"] = `${token_type} ${newToken}`;

        return axiosClient(originalRequest);
      } catch (refreshErr) {
        console.error("Token refresh failed", refreshErr);
        localStorage.removeItem("loginUser");
        return Promise.reject(refreshErr);
      }
    }

    // Don't attempt retry if no token or user already logged out
    return Promise.reject(error);
  }
);

export default axiosClient;
