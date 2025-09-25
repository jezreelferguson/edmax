import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    // Let axios set Content-Type; we only advertise we accept JSON
    Accept: "application/json",
  },
});

export default api;


