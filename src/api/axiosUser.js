import axios from 'axios';

console.log(process.env.REACT_APP_ADMIN_BASE_URL);

export const axiosUser = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_BASE_URL || 'http://localhost:4000',
});

axiosUser.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token');
        if (token) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error.response);
    },
);

axiosUser.interceptors.response.use(
    (response) => {
        console.log(response);

        if (response && response.data) {
            return response.data;
        }
    },
    (error) => {
        return Promise.reject(error.response);
    },
);
