import React, { useEffect } from "react";
import RestaurantForm from "../common/restaurant-form";

const AddNewRestaurant = () => {
    useEffect(() => {
        document.title = "Add New Restaurant";
    }, []);
    return (
        <>
        <RestaurantForm add={true} detail={false} edit={false}/>
        </>
    );
}

export default AddNewRestaurant;