import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveMenuItem } from "../../../utils/api/menu-items/menu-items";
import MenuItemForm from "../common/menu-item-form";
const MenuItemEdit = () => {
  const [menuItemData, setMenuItemData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Menu Item Edit";
    const fetchMenuItemData = async () => {
      try {
        const response = id && (await retrieveMenuItem(Number(id)));
        if (response.data) {
          setMenuItemData(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchMenuItemData();
  }, [id]);

  return (
    <>
      {contextHolder}
      <MenuItemForm
        add={false}
        detail={false}
        edit={true}
        menu_item_data={menuItemData}
      />
    </>
  );
};

export default MenuItemEdit;
