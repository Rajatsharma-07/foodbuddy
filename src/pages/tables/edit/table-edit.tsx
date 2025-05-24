import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveTable } from "../../../utils/api/tables/tables";
import TableForm from "../common/table-form";
const TableEdit = () => {
  const [tableData, setTableData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Table Edit";
    const fetchTableData = async () => {
      try {
        const response = id && (await retrieveTable(Number(id)));
        if (response.data) {
          setTableData(response.data);
        }
      } catch (error: any) {
        messageApi.error(error.message);
      }
    };
    fetchTableData();
  }, [id]);

  return (
    <>
      {contextHolder}
      <TableForm
        add={false}
        detail={false}
        edit={true}
        table_data={tableData}
      />
    </>
  );
};

export default TableEdit;
