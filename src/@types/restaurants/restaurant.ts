export type Restaurant = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    is_active: boolean;
}

export type RestaurantInUserList = {
    id: number;
    name: string;
}