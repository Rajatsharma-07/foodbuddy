import { QueryParams } from "../../../@types/common/common";
import { MenuItemJunction } from "../../../@types/menu-item-junction/menu-item-junction";
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

export const createMenu = async (
  menuData: Menu,
  menuItemData: MenuItemJunction
) => {
  try {
    let data = {
      menu_data: menuData,
      menu_item_data: menuItemData,
    };
    const response = await axios.post("/menus", data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateMenu = async (
  id: number,
  menuData: Menu,
  menuItemData: MenuItemJunction
) => {
  try {
    let data = {
      menu_data: menuData,
      menu_item_data: menuItemData,
    };
    const response = await axios.put(`/menus/${id}`, data);
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

export const importMenuData = async (data: {name: string, menu_id: number}) => {
  try {
    const response = await axios.post(`/menus/import`, data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
