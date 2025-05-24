import { QueryParams } from "../../../@types/common/common";
import { Table } from "../../../@types/tables/tables";
import axios from "../axios";

export const fetchTableList = async ({
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
    const response = await axios.get("/tables", { params });
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveTable = async (id: number) => {
  try {
    const response = await axios.get(`/tables/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createTable = async (data: Table) => {
  try {
    const response = await axios.post("/tables", data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateTable = async (id: number, tableData: Table) => {
  try {
    const response = await axios.put(`/tables/${id}`, tableData);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteTable = async (id: number) => {
  try {
    const response = await axios.delete(`/tables/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
