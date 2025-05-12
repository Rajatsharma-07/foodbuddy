import { QueryParams } from "../../../@types/common/common";
import { Restaurant } from "../../../@types/restaurants/restaurant";
import axios from "../admin_axios";

export const fetchRestaurantList = async ({
  page,
  limit,
  sort_field,
  sort_order,
  filters,
}: QueryParams & { filters?: Record<string, string> }) => {
  try {
    const params: any = {
      page,
      limit,
      sort_field,
      sort_order,
    };

    Object.entries(filters || {}).forEach(([key, value]) => {
      params[key] = value;
    });
    const response = await axios.get("/restaurants", { params });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveRestaurant = async (id: number) => {
  try {
    const response = await axios.get(`/restaurants/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createRestaurant = async (data: Restaurant) => {
  try {
    const response = await axios.post("/restaurants", data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateRestaurant = async (id: number, restaurantData: Restaurant) => {
  try {
    const response = await axios.put(`/restaurants/${id}`, restaurantData);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteRestaurant = async (id: number) => {
  try {
    const response = await axios.delete(`/restaurants/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};