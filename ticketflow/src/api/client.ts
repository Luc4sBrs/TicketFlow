import axios from "axios";

// Aponta para o json-server rodando localmente (ver README).
// Em um projeto real, isso viria de uma variável de ambiente (import.meta.env.VITE_API_URL).
export const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 8000,
});
