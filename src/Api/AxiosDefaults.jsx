import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ImageInstance = {
  axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

  
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

console.log('Axios instance methods:', ImageInstance);

console.log('ImageInstance', ImageInstance);

console.log('Does post exist?', typeof ImageInstance.post === 'function');

export default axiosInstance;