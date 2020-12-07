import axios from 'axios';

export const axiosUser = axios.create({
    baseURL: 'http://localhost:4000',
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
        throw error;
    },
);

axiosUser.interceptors.response.use(
    (response) => {
        if (response.data) {
            return response.data;
        }
    },
    (error) => {
        throw error;
    },
);
