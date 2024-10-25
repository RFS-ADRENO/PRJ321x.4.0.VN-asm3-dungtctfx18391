import axios, { isAxiosError } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: import.meta.env.PROD,
});

api.interceptors.response.use(
    async (v) => {
        return new Promise((r) => setTimeout(() => r(v), 300));
    },
    (err) => {
        if (isAxiosError(err)) {
            if (err.response?.status == 401) {
                window.location.href = "/auth/signin";
            }
        }

        throw err;
    }
);
