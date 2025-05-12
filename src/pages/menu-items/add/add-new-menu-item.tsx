import { useEffect } from "react";
import MenuItemForm from "../common/menu-item-form";

const AddNewMenuItem = () => {
  useEffect(() => {
    document.title = "Add New Menu Item";
  }, []);
  return (
    <>
      <MenuItemForm add={true} detail={false} edit={false} />
    </>
  );
};

export default AddNewMenuItem;
