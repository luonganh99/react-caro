import axios from 'axios';

export const axiosUser = axios.create({
    baseURL: process.env.API_USER_BASE_URL || 'http://localhost:4000',
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
