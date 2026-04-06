import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import { getFoods } from '../../api'; // Import API helper

const Home = () => {
  const [category, setCategory] = useState("All");
  const [foods, setFoods] = useState([]);

  // Fetch foods from backend
  useEffect(() => {
    getFoods()
      .then(res => {
        // If category is "All", show everything, otherwise filter by category
        if (category === "All") {
          setFoods(res.data);
        } else {
          const filtered = res.data.filter(food => food.category === category);
          setFoods(filtered);
        }
      })
      .catch(err => console.error("Error fetching foods:", err));
  }, [category]); // Re-run when category changes

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay foods={foods} /> {/* Pass foods as prop */}
      <AppDownload />
    </div>
  );
};

export default Home;