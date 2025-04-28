import axios from "axios";

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
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
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
