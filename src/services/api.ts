import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Akses URL dari .env

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ambil token dari local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Tambahkan token ke header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
