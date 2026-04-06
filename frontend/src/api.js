import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// Food
export const getFoods = () => API.get("/api/food/list");

// User
export const registerUser = (data) => API.post("/api/user/register", data);
export const loginUser = (data) => API.post("/api/user/login", data);

// Cart
export const getCart = () => API.get("/api/cart/get");
export const addToCart = (data) => API.post("/api/cart/add", data);
export const removeFromCart = (data) => API.post("/api/cart/remove", data);

// Order
export const createOrder = (data) => API.post("/api/order", data);
export const getOrders = () => API.get("/api/order");

export default API;