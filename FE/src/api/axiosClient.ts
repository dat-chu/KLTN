import axios from "axios";
import {loadFromLocalStorage} from "../helpers/localStorage";

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
  async (err) => {
    if (err.response.status === 401 && !err.config._retry) {
      err.config._retry = true;
      interface RefreshResponse {
        access_token: string;
      }

      const {refresh_token, token_type}: AuthToken = loadFromLocalStorage("loginUser");

      const refreshResponse = await axios.post<RefreshResponse>('/auth/refresh', {
        refresh_token: refresh_token,
      });

      const newToken = refreshResponse.data.access_token;
      localStorage.setItem("loginUser", JSON.stringify({...loadFromLocalStorage("loginUser"), access_token: newToken}));

      // Update the original request with the new token
      err.config.headers['Authorization'] = `${token_type} ${newToken}`;
      // Retry the original request with the new token
      return axios(err.config);
    }

    return Promise.reject(err);
  }
);

// Interceptor response
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response);
    } else if (error.request) {
      console.error("No response from API", error.request);
    } else {
      console.error("Error setting up request", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
