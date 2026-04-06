// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// Food
export const getFoods = () => API.get("/api/food");

// User
export const registerUser = (data) => API.post("/api/user/register", data);
export const loginUser = (data) => API.post("/api/user/login", data);

// Cart
export const getCart = (userId) => API.get(`/api/cart/${userId}`);
export const addToCart = (data) => API.post("/api/cart", data);
export const removeFromCart = (cartId) => API.delete(`/api/cart/${cartId}`);

// Order
export const createOrder = (data) => API.post("/api/order", data);
export const getOrders = (userId) => API.get(`/api/order/${userId}`);

export default API;