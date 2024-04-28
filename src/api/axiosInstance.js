import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        config.headers['Authorization'] = `Bearer ${token}`;
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;
