import { useEffect } from "react";
import MenuForm from "../common/menu-form";

const AddNewMenu = () => {
  useEffect(() => {
    document.title = "Add New Menu";
  }, []);
  return (
    <>
      <MenuForm add={true} detail={false} edit={false} />
    </>
  );
};

export default AddNewMenu;
