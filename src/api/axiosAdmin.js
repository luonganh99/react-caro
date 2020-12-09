import axios from 'axios';

console.log(process.env.REACT_APP_ADMIN_BASE_URL);

export const axiosAdmin = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_BASE_URL || 'http://localhost:4000/admin',
});

axiosAdmin.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token');
        if (token) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosAdmin.interceptors.response.use(
    (response) => {
        if (response.data) {
            return response.data;
        }
    },
    (error) => {
        return Promise.reject(error);
    },
);
