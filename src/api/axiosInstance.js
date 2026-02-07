import axios from "axios";

// Create centralized axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: "https://elite-properties-backend-production.up.railway.app", // Production backend URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making API request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common error cases
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API response error:', error.code, error.message);
    // Let callers (AuthContext or UI) decide how to handle 401/authorization failures.
    if (error.response?.status === 401) {
      console.warn('Received 401 from API - not auto-clearing token. Letting AuthContext handle this.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;