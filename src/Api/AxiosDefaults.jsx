import axios from 'axios';
 
// axios instance for json requests
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios instance for multipart/form-data requests
export const axiosFormInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  withCredentials: true,
});

export default axiosInstance;
