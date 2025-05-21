import axios from "axios";
// import { useNavigate } from "react-router-dom"; // This import is problematic here, see explanation below

const baseURL = "http://localhost:2500/api/";

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
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
        console.log(`Response from response interceptor: `, response);
        return {
            ...response,
            data: response.data
        };
    },
    (error) => {
        console.error("Error from response interceptor: ", error); // Log the error for debugging

        // Check if the error has a response and if the status code is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized error (401). Removing token from local storage.");
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;