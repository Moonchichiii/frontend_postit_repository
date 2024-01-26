import axios from 'axios';
 
// axios instance for json requests
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

//  post searches 

export const axiosPublicInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios instance for multipart/form-data requests
export const axiosFormInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  
  withCredentials: true,
});

export default axiosInstance;
