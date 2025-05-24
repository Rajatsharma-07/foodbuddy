import { FOOD_TYPE } from "../../utils/constants/constants";
import { MenuItem } from "../menu-item/menu-item";
import { Menu } from "../menu/menu";

export type MenuItemJunction = {
    id: number;
    menu_id: number;
    menu_item_id: number;
    price: number;
    food_type: FOOD_TYPE;
    menu: Menu;
    menu_item: MenuItem;
}