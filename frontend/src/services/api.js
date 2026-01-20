import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth services
export const authService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
};

// Todo services
export const todoService = {
  getAll: (params) => api.get("/api/todos", { params }),
  create: (data) => api.post("/api/todos", data),
  update: (id, data) => api.put(`/api/todos/${id}`, data),
  delete: (id) => api.delete(`/api/todos/${id}`),
  toggle: (id) => api.patch(`/api/todos/${id}/toggle`),
};

export default api;
