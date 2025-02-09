// Axios Interceptor

import axios from "axios";
import { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { getAccessToken, setAccessToken, removeAccessToken } from "./auth";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    }
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
},
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response: AxiosResponse) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log(`Access Token 만료됨, Refresh Token으로 갱신 중`)
            try {
                const refreshResponse = await axios.post<{ accessToken: string }>(
                    `http://localhost:8080/api/v1/auth/reissue`,
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = refreshResponse.data.accessToken
                setAccessToken(newAccessToken);

                error.config.headers.Authorization = `Bearer ${newAccessToken}`
                return axios(error.config);
            } catch (refreshError) {
                console.error(`Refresh Token 만료됨`)
                removeAccessToken();
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error)
    }
)
