import axios from "axios";

// Create centralized axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "https://elite-properties-backend-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common error cases
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Let callers (AuthContext or UI) decide how to handle 401/authorization failures.
    if (error.response?.status === 401) {
      console.warn('Received 401 from API - not auto-clearing token. Letting AuthContext handle this.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;