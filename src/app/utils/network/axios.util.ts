import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
