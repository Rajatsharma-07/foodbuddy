import { QueryParams } from "../../../@types/common/common";
import { TableCategory } from "../../../@types/table-categories/table-categories";
import axios from "../axios";

export const fetchTableCategoryList = async ({
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
    const response = await axios.get("/table-categories", { params });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveTableCategory = async (id: number) => {
  try {
    const response = await axios.get(`/table-categories/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createTableCategory = async (data: TableCategory) => {
  try {
    const response = await axios.post("/table-categories", data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateTableCategory = async (
  id: number,
  tableCategoryData: TableCategory
) => {
  try {
    const response = await axios.put(
      `/table-categories/${id}`,
      tableCategoryData
    );
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTableCategory = async (id: number) => {
  try {
    const response = await axios.delete(`/table-categories/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
