import { QueryParams } from "../../../@types/common/common";
import { MenuItem } from "../../../@types/menu-item/menu-item";
import axios from "../axios";

export const fetchMenuItemList = async (category: string | null) => {
  try {
    const response = await axios.get(`/menu-items/?&category=${category}`);
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
    console.log(data);
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
