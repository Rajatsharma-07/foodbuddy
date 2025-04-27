import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveRestaurant } from "../../../utils/api/restaurant/restaurant";
import RestaurantForm from "../common/restaurant-form";
const RestaurantEdit = () => {
  const [restaurantData, setRestaurantData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Restaurant Edit";
    const fetchRestaurantData = async () => {
      try {
        const response = id && (await retrieveRestaurant(Number(id)));
        if (response.data) {
          setRestaurantData(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchRestaurantData();
  }, [id]);

  return (
    <>
      {contextHolder}
      <RestaurantForm
        add={false}
        detail={false}
        edit={true}
        restaurant_data={restaurantData}
      />
    </>
  );
};

export default RestaurantEdit;
