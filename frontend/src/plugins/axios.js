import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:18000/',
});

export default axiosInstance;
