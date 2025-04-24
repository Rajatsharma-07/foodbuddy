import { isAxiosError } from "axios";
import { ApiErrorType } from "../../../@types/common/common";
import { LoginApiBodyPayload } from "../../../@types/users/user";
import axios, { setSession } from "../axios";

export const fetchRestaurantList = async () => {
  try {
    const response = await axios.get("/restaurants");
    console.log(response);
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
