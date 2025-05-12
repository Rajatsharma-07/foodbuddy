import { GetOtpPayload, QueryParams } from "../../../@types/common/common";
import {
  LoginApiBodyPayload,
  UserCreateData,
  UserUpdateData,
} from "../../../@types/users/user";
import { PATH_AUTH } from "../../../routes/paths";
import axios, { setAdminSession } from "../admin_axios";

export const get_otp = async (data: GetOtpPayload) => {
  try {
    const response = await axios.post(`/users/send-otp`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const login = async (data: LoginApiBodyPayload) => {
  try {
    const response = await axios.post("/users/login", data);
    if (response?.data?.token) {
      setAdminSession(response.data.token);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    setAdminSession(null);
    window.location.pathname = PATH_AUTH.adminLogin
  } catch (error) {
    throw error;
  }
};

export const fetchUserList = async ({
  page,
  limit,
  sort_field,
  sort_order,
  filters
}: QueryParams & { filters: Record<string, string>}) => {
  try {
    const params: any = {
      page,
      limit,
      sort_field,
      sort_order,
    }

    Object.entries(filters).forEach(([key, value]) => {
      params[key] = value;
    });
    const response = await axios.get("/users", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: UserCreateData) => {
  try {
    const response = await axios.post("/users", data);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const retrieveUser = async (id: number) => {
  try {
    const response = await axios.get(`/users/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: number, userData: UserUpdateData) => {
  try {
    const response = await axios.put(`/users/${id}`, userData);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`/users/${id}`);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
