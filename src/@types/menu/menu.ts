import { RestaurantInUserList } from "../restaurants/restaurant";

export type Menu = {
  id: number;
  name: string;
  is_active: boolean;
  restaurant_id: number;
  restaurant?: RestaurantInUserList;
};
