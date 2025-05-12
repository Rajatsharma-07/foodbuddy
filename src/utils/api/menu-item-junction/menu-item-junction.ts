import axios from "../axios";

export const fetchMenuItemJunctionList = async (menu_id: number) => {
  try {
    const response = await axios.get(`/menu-item-junction/${menu_id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteMenuItemJunctionList = async (
  menu_id: number,
  deleteMenuItemsData: number[]
) => {
  try {
    const response = await axios.delete(`/menu-item-junction/${menu_id}`, {
      data: deleteMenuItemsData,
    });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
