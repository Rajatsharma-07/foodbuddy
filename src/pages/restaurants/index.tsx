import React, { useEffect, useState } from "react";
import { fetchRestaurantList } from "../../utils/api/restaurant/restaurant";
import { message } from "antd";
const Restaurants = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await fetchRestaurantList();
        setRestaurantList(response.data);
      } catch (error: any) {
        message.error(error);
      }
    };

    getRestaurants();
  }, []);
  return (
    <>
      <h1>Restaurants: Coming Soon...</h1>
      <h2> Stay Tuned! Good things take time.</h2>
      <ul>
        {restaurantList.map((restaurant: any) => (
            <li key={restaurant.id}>{JSON.stringify(restaurant)}</li>
        ))}
      </ul>
    </>
  );
};

export default Restaurants;
