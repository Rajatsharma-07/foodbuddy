import axios from "axios";
import { API_VERSION } from "../constants/config-global";
import { ADMIN_TOKEN_KEY } from "../constants/constants";
import { PATH_AUTH } from "../../routes/paths";

const adminAxiosInstance = axios.create({ baseURL: API_VERSION });

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response.status === 401) {
        setAdminSession(null);
        tokenExpired();
      }
      return Promise.reject(
        (error.response && error.response.data) || "Something went wrong"
      );
    } catch (e: any) {
      return Promise.reject(
        (e.response && e.response.data) || "Something went wrong"
      );
    }
  }
);

export const setAdminSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem(ADMIN_TOKEN_KEY, accessToken);
    adminAxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return adminAxiosInstance;
  } else {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
};

export const tokenExpired = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);

  if (
    !window.location.pathname.includes("login") &&
    window.location.pathname.includes("admin")
  ) {
    window.location.href = PATH_AUTH.adminLogin;
  }
};
export default adminAxiosInstance;
