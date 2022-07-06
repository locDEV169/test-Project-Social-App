import axios from "axios";
const API_URL = process.env.API_URL || "http://192.168.0.141:8080/api";
export const URL_UPLOAD = "http://192.168.0.141:8080/";

const api = axios.create({
    baseURL: `${API_URL}`,
});

export default api;
