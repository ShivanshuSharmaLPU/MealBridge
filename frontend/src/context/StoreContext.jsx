// src/context/StoreContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // State
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  // Backend URL from env
  const url = process.env.REACT_APP_BACKEND_URL;

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return newCart;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Add to cart error:", err);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const currentCount = prev[itemId];
      let newCart;
      if (!currentCount || currentCount <= 0) {
        newCart = prev;
      } else if (currentCount === 1) {
        const { [itemId]: _, ...rest } = prev;
        newCart = rest;
      } else {
        newCart = { ...prev, [itemId]: currentCount - 1 };
      }
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return newCart;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Remove from cart error:", err);
      }
    }
  };

  // Total amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Load cart from backend
  const loadCartData = async (localToken) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: localToken } });
      setCartItems(response.data.cartData);
    } catch (err) {
      console.error("Load cart error:", err);
    }
  };

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (err) {
      console.error("Fetch food list error:", err);
    }
  };

  // Load initial data
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      }

      // Load cart from localStorage if backend not used
      const localCart = JSON.parse(localStorage.getItem("cartItems"));
      if (localCart) setCartItems(localCart);
    }
    loadData();
  }, []);

  // Context value
  const contextValue = {
    food_list: Array.isArray(food_list) ? food_list : [],
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;