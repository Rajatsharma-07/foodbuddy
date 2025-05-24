import { RestaurantInUserList } from "../restaurants/restaurant";
import { TableCategory } from "../table-categories/table-categories";

export type Table = {
    id: number;
    name: string;
    status: string;
    is_active: boolean;
    restaurant_id: number;
    restaurant?: RestaurantInUserList;
    category_id: number;
    category?: TableCategory;
}