import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {

      if (error.response && error.response.status === 401) {
        
      }

      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;

