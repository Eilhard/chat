import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:18000/api/',
});

export default axiosInstance;
