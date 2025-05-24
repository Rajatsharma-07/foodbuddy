import { Divider, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../assets/common/header";
import { PATHS } from "../../../routes/paths";
import { retrieveMenu } from "../../../utils/api/menu/menu";
import MenuForm from "../common/menu-form";
const MenuDetail = () => {
  const [menuData, setMenuData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Menu Detail";
    const fetchMenuData = async () => {
      try {
        const response = id && (await retrieveMenu(Number(id)));
        if (response.data) {
          setMenuData(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchMenuData();
  }, [id]);

  return (
    <>
      {contextHolder}
      <Header
        title="Menu Details"
        button_text="Edit"
        on_click_url={PATHS.menus.edit(Number(id))}
      />
      <MenuForm add={false} detail={true} edit={false} menu_data={menuData} />
    </>
  );
};

export default MenuDetail;
