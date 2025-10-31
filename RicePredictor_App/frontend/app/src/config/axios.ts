import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

const axiosClient = axios.create({
  baseURL: API_URL, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, 
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    
    // .... 

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 404) {
      console.log("Resource not found!");
    }

    if (status === 401 || status === 403) {
      console.log("Unauthorized - Redirecting to login");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;