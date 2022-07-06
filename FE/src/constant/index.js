import axios from "axios";
const API_URL = process.env.API_URL || "http://localhost:8080/api";
export const URL_UPLOAD = "http://localhost:8080/";

const api = axios.create({
    baseURL: `${API_URL}`,
});

export default api;
