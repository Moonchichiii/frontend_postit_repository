import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ImageInstance = {
 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  
};
console.log('Axios instance methods:', ImageInstance);



export default axiosInstance;