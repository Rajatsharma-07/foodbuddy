import { useEffect } from "react";
import TableCategoryForm from "../common/table-category-form";

const AddNewTableCategory = () => {
  useEffect(() => {
    document.title = "Add New Table Category";
  }, []);
  return (
    <>
      <TableCategoryForm add={true} detail={false} edit={false} />
    </>
  );
};

export default AddNewTableCategory;
