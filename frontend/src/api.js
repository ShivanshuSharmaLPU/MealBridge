// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// User APIs
export const registerUser = (data) => API.post("/api/user/register", data);
export const loginUser = (data) => API.post("/api/user/login", data);

// Food
export const getFoods = () => API.get("/api/food/list");

// Cart
export const getCart = () => API.get("/api/cart");
export const addToCart = (data) => API.post("/api/cart/add", data);
export const removeFromCart = (data) => API.post("/api/cart/remove", data);

// Order
export const createOrder = (data) => API.post("/api/order", data);
export const getOrders = () => API.get("/api/order");

export default API;