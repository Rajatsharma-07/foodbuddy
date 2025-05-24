import { QueryParams } from "../../../@types/common/common";
import { MenuItem } from "../../../@types/menu-item/menu-item";
import axios from "../axios";

export const fetchMenuItemList = async ({
  category,
  foodType,
  limit,
  page,
  not_in_array,
}: QueryParams) => {
  try {
    const params = new URLSearchParams();

    if (category !== null && category !== undefined) {
      params.append("category", category);
    }

    if (foodType !== null && foodType !== undefined) {
      params.append("food_type", foodType);
    }

    if (page) {
      params.append("page", String(page));
    }

    if (limit) {
      params.append("limit", String(limit));
    }

    if (not_in_array && not_in_array?.length > 0) {
      not_in_array.forEach((id) => {
        params.append("not_in_array", String(id));
      });
    }
    const response = await axios.get(`/menu-items?${params.toString()}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveMenuItem = async (id: number) => {
  try {
    const response = await axios.get(`/menu-items/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createMenuItem = async (data: MenuItem) => {
  try {
    const response = await axios.post("/menu-items", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateMenuItem = async (id: number, menuItemData: MenuItem) => {
  try {
    const response = await axios.put(`/menu-items/${id}`, menuItemData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteMenuItem = async (id: number) => {
  try {
    const response = await axios.delete(`/menu-items/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
