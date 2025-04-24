import { LoginApiBodyPayload } from "../../../@types/users/user";
import { PATH_AUTH } from "../../../routes/paths";
import axios, { setSession } from "../axios";

export const login = async (data: LoginApiBodyPayload) => {
  try {
    const response = await axios.post("/users/login", data);
    if (response?.data?.token) {
      setSession(response.data.token);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const pathname = window.location.pathname;
    setSession(null);
    window.location.href = pathname.includes("admin") ? PATH_AUTH.adminLogin : PATH_AUTH.login;
  } catch (error) {
    console.log("Error while logging out:", error);
  }
}

export const fetchUserList = async () => {
  try {
    const response = await axios.get("/users");
    console.log(response);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
