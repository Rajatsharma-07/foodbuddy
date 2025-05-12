import { useEffect } from "react";
import MenuCategoryForm from "../common/menu-category-form";

const AddNewMenuCategory = () => {
  useEffect(() => {
    document.title = "Add New Menu Category";
  }, []);
  return (
    <>
      <MenuCategoryForm add={true} detail={false} edit={false} />
    </>
  );
};

export default AddNewMenuCategory;
