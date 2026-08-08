import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const analyzeWebsite = async (url) => {
  const response = await API.post("/analyze", { url });
  return response.data;
};

export const getWebsiteHistory = async () => {
  const response = await API.get("/history");
  return response.data;
};

export const detectLeak = async (text) => {
  const response = await API.post("/leak-detect", { text });
  return response.data;
};

export const getLeakHistory = async () => {
  const response = await API.get("/leak-history");
  return response.data;
};

export default API;