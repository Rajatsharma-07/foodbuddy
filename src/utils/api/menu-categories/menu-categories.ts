import { QueryParams } from "../../../@types/common/common";
import { MenuCategory } from "../../../@types/menu-categories/menu-category";
import axios from "../axios";

export const fetchMenuCategoryList = async ({
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
    const response = await axios.get("/menu-categories", { params });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveMenuCategory = async (id: number) => {
  try {
    const response = await axios.get(`/menu-categories/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createMenuCategory = async (data: MenuCategory) => {
  try {
    const response = await axios.post("/menu-categories", data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateMenuCategory = async (id: number, menuCategoryData: MenuCategory) => {
  try {
    const response = await axios.put(`/menu-categories/${id}`, menuCategoryData);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteMenuCategory = async (id: number) => {
  try {
    const response = await axios.delete(`/menu-categories/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};