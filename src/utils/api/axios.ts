import axios from "axios";
import { API_VERSION } from "../constants/config-global";
import { ADMIN_TOKEN_KEY } from "../constants/constants";
import { PATH_AUTH } from "../../routes/paths";

const axiosInstance = axios.create({ baseURL: API_VERSION });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response.status === 401) {
        setSession(null);
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

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem(ADMIN_TOKEN_KEY, accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return axiosInstance;
  } else {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
};

export const tokenExpired = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);

  if (!window.location.pathname.includes("login")) {
    window.location.href = PATH_AUTH.adminLogin;
  }
};
export default axiosInstance;
