import axiosInstance from "./axiosInstance";

const productsApi = {
    addProduct: async (productData) => {
        try {
            const response = await axiosInstance.post("/product", productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    fetchFeaturedProducts: async () => {
        try {
            const response = await axiosInstance.get("/product/featured");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    fetchAllProducts: async () => {
        try {
            const response = await axiosInstance.get("/product");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    fetchProductById: async (id) => {
        try {
            const response = await axiosInstance.get(`/product/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const response = await axiosInstance.put(`/product/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await axiosInstance.delete(`/product/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchProducts: async (query) => {
        try {
            const response = await axiosInstance.get(`/product/search?query=${query}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    filterProducts: async (filters) => {
        try {
            const params = new URLSearchParams(filters);
            const response = await axiosInstance.get(`/product/filter?${params.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default productsApi;