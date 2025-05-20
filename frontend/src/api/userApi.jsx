import axiosInstance from "./axiosInstance";

const usersApi = {
    login: async (userData) => {
        try {
            const response = await axiosInstance.post("/user/login", userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post("/user/register", userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserProfile: async () => {
        try {
            const response = await axiosInstance.get("/user/me");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserProfileById: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUserProfile: async (userData) => {
        try {
            const response = await axiosInstance.put("/user", userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    changePassword: async (passwordData) => {
        try {
            const response = await axiosInstance.put("/user/change-password", passwordData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default usersApi;