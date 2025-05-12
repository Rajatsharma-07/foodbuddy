import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveMenuCategory } from "../../../utils/api/menu-categories/menu-categories";
import MenuCategoryForm from "../common/menu-category-form";
const MenuCategoryDetail = () => {
  const [menuCategoryData, setMenuCategoryData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Menu Category Detail";
    const fetchMenuCategoryData = async () => {
      try {
        const response = id && (await retrieveMenuCategory(Number(id)));
        if (response.data) {
          setMenuCategoryData(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchMenuCategoryData();
  }, [id]);

  return (
    <>
      {contextHolder}
      <MenuCategoryForm
        add={false}
        detail={true}
        edit={false}
        menu_category_data={menuCategoryData}
      />
    </>
  );
};

export default MenuCategoryDetail;
