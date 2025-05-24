import { RestaurantInUserList } from "../restaurants/restaurant";

export type TableCategory = {
    id: number;
    name: string;
    prefix: string;
    restaurant_id: number;
    restaurant?: RestaurantInUserList;
}