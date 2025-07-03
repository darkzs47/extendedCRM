import axios from 'axios';
import type {AuthResponse} from "../models/response/AuthResponse.ts";

export const API_URL = 'http://localhost:5252';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
)

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config.isRetry) {
        originalRequest.isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest)
        } catch (e) {
            console.log('Пользователь не авторизован')
        }
    }
    throw error;
})

export default api;