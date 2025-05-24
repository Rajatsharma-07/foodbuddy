import { FOOD_TYPE } from "../../utils/constants/constants";
import { MenuCategory } from "../menu-categories/menu-category";
import { Menu } from "../menu/menu";
import { RestaurantInUserList } from "../restaurants/restaurant";

export type MenuItem = {
    id: number;
    image?: string;
    image_path?: string;
    name: string;
    default_price: number;
    food_type: FOOD_TYPE;
    description: string;
    is_available: boolean;
    is_active: boolean;
    category_id: number;
    menu_id: number;
    restaurant_id: number;
    category?: MenuCategory;
    restaurant?: RestaurantInUserList;
  };