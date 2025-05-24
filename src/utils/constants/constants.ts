export const HEADER_HEIGHT = "64px";
export const SCROLLED_HEADER_HEIGHT = "74px";
export const ADMIN_TOKEN_KEY = "admin_token";
export const TOKEN_KEY = "token";

export const ROLES = [
  {
    id: 1,
    name: "Admin",
    db_name: "admin",
  },
  {
    id: 2,
    name: "Pseudo Admin",
    db_name: "pseudo_admin",
  },
  {
    id: 3,
    name: "Captain",
    db_name: "captain",
  },
];

export enum TABLE_STATUS {
  AVAILABLE = "available",
  OCCUPIED = "occupied",
  RESERVED = "reserved",
  CLEANING = "cleaning",
  BLOCKED = "blocked",
  ORDER_PLACED = "order_placed",
  FOOD_SERVED = "food_served",
  BILLING_IN_PROGRESS = "billing_in_progress",
  PAYMENT_PENDING = "payment_pending",
  PAYMENT_RECEIVED = "payment_received",
}

export const FOOD_TYPE_LABEL = {
  veg: "Veg",
  "non_veg": "Non Veg",
  egg: "Egg",
}

export enum FOOD_TYPE {
  VEG = "veg",
  NON_VEG = "non_veg",
  EGG = "egg"
}