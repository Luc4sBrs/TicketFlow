import axios from "axios";

// Em produção, isso vem de uma env var (import.meta.env.VITE_API_URL) apontando
// para o back-end publicado (ex.: Render). Em dev, cai no servidor local.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});
