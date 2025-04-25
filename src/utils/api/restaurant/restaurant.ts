import axios from "../axios";

export const fetchRestaurantList = async () => {
  try {
    const response = await axios.get("/restaurants");
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
