import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";


const API_BASE_URL="https://tweek-pi.vercel.app/api"
// const API_BASE_URL="http://localhost:5001/api"

export const createApiClient = (getToken: () => Promise<string | null>): AxiosInstance => {
  const api = axios.create({ baseURL: API_BASE_URL, headers: { "Content-Type": "application/json" , "User-Agent": "Tweek-App/1.0.0 (Android; iOS)"} });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    console.log(token, "token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
  updateProfile: (api: AxiosInstance, data: any) => api.put("/users/profile", data),
};