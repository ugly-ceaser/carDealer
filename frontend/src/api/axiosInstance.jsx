import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:2500/api/";

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request intercetor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`Response from response interceptor: ${response}`)
        return {
            ...response,
            data: response.data
        };
    },
    (error) => {
        console.log(`Error from response interceptor: ${error}`)
        return Promise.reject(error);
    }
);

export default axiosInstance
