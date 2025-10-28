import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ local mock API
  headers: { "Content-Type": "application/json" },
});

export default api;
