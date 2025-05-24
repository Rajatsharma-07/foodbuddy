import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../assets/common/header";
import { PATHS } from "../../../routes/paths";
import { retrieveTable } from "../../../utils/api/tables/tables";
import TableForm from "../common/table-form";
const TableDetail = () => {
  const [tableData, setTableData] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Table Detail";
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
      <Header
        title="Table Details"
        button_text="Edit"
        on_click_url={PATHS.tables.edit(Number(id))}
      />
      <TableForm
        add={false}
        detail={true}
        edit={false}
        table_data={tableData}
      />
    </>
  );
};

export default TableDetail;
