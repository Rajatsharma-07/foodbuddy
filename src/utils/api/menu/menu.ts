import { QueryParams } from "../../../@types/common/common";
import { Menu } from "../../../@types/menu/menu";
import axios from "../axios";

export const fetchMenuList = async ({
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
    const response = await axios.get("/menus", { params });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveMenu = async (id: number) => {
  try {
    const response = await axios.get(`/menus/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createMenu = async (data: Menu) => {
  try {
    const response = await axios.post("/menus", data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateMenu = async (id: number, menuData: Menu) => {
  try {
    const response = await axios.put(`/menus/${id}`, menuData);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteMenu = async (id: number) => {
  try {
    const response = await axios.delete(`/menus/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};