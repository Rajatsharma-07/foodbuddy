import { RestaurantInUserList } from "../restaurants/restaurant";

export type MenuCategory = {
    id: number;
    name: string;
    restaurant_id: number;
    restaurant?: RestaurantInUserList;
}