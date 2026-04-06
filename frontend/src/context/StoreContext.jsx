import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = process.env.REACT_APP_BACKEND_URL; // Use environment variable
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // Save cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    if (token) {
      await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const currentCount = prev[itemId];
      if (currentCount === undefined || currentCount <= 0) return prev;
      if (currentCount === 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: currentCount - 1 };
    });

    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    if (token) {
      await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token) => {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      }
    }
    loadData();
  }, []);

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

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;