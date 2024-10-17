import axios from "axios";

export const axiosBase = axios.create({
    baseURL: 'https://todos-be.vercel.app/'
})

axiosBase.interceptors.request.use(
    (config) => {
        const token = `Bearer ${localStorage.getItem('token')}`
        if (token) {
            config.headers.Authorization = token
        }

        return config;
    },
    error => {
        return Promise.reject(error)
    }
)