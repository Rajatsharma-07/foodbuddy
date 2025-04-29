import { RestaurantInUserList } from "../restaurants/restaurant";
import { Role } from "../role/role";

export type LoginApiBodyPayload = {
  phonenumber: number;
  otp_code: string;
  remember: boolean;
  admin: boolean;
};

export type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  role_id: number;
  restaurant_id: number | null;
  createdAt: string;
  updatedAt: string;
  role: Role;
  restaurant: RestaurantInUserList | null;
};

export type JwtUserPayload = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phonenumber: string;
  is_active: boolean;
  is_superuser: boolean;
  role_id: number;
  restaurant_id: number;
  createdAt: string;
  updatedAt: string;
  role: string;
  restaurant: string;
  iat: number;
  exp: number;
}

export type UserCreateData = {
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  restaurant_id: number | null;
  is_superuser?: boolean;
}

export type UserUpdateData = {
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  restaurant_id: number | null;
  is_superuser?: boolean;
}