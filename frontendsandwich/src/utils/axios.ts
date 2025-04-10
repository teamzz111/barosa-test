import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const API_URL = 'http://localhost:3000';
const TIMEOUT = 10000;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2Y1ZDM4MjNhZjY4ZjQ4MWNiYTY3ZjUiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiQW5kcsOpcyBMYXJnbyIsImlhdCI6MTc0NDI1OTU3NywiZXhwIjoxNzc1ODE3MTc3fQ.tVz3fUQmEwwjKKO8TvAzCyfMDieWoaMB49Fn0A3kSXI';

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    if (error.response) {
      console.error('HTTP Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
