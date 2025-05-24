import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveTableCategory } from "../../../utils/api/table-categories/table-categories";
import TableCategoryForm from "../common/table-category-form";
const TableCategoryEdit = () => {
  const [tableCategoryData, setTableCategoryData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Table Category Edit";
    const fetchTableCategoryData = async () => {
      try {
        const response = id && (await retrieveTableCategory(Number(id)));
        if (response.data) {
          setTableCategoryData(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchTableCategoryData();
  }, [id]);

  return (
    <>
      {contextHolder}
      <TableCategoryForm
        add={false}
        detail={false}
        edit={true}
        table_category_data={tableCategoryData}
      />
    </>
  );
};

export default TableCategoryEdit;
