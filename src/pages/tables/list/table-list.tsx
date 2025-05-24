import {
  Badge,
  Button,
  Card,
  Col,
  message,
  Row,
  Typography
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../@types/tables/tables";
import { PATHS } from "../../../routes/paths";
import { fetchTableList } from "../../../utils/api/tables/tables";

const TABLE_STATUS_COLORS: Record<string, string> = {
  available: "lightgrey",
  occupied: "red",
  reserved: "blue",
  cleaning: "red",
  blocked: "red",
  order_placed: "red",
  food_served: "red",
  billing_in_progress: "red",
  payment_pending: "red",
  payment_received: "green",
};

const TableList = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      const response = await fetchTableList({});
      setData(response.data);
    };
    fetchTables();
  }, []);

  return (
    <>
      {contextHolder} {/* For message API */}
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        <h2>Tables</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(PATHS.tables.new)}
        >
          Add new table
        </Button>
      </Flex>
      <Flex justify="end" align="center">
        <Flex gap={16}>
          <Typography>
            <Badge color="lightgrey" /> - Available
          </Typography>
          <Typography>
            <Badge color="green" /> - Paid
          </Typography>
          <Typography>
            <Badge color="red" /> - Running
          </Typography>
          <Typography>
            <Badge color="blue" /> - Reserved
          </Typography>
        </Flex>
      </Flex>
      {data?.map((item: any) => (
        <>
          <h4 style={{ color: "var(--primary-color)" }}>
            {`${item.category_name} (${item.category_prefix})`}
          </h4>
          <Row gutter={[16, 16]}>
            {item.tables.map((table: Table) => (
              <Col span={3}>
                <Card
                  key={table.id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      TABLE_STATUS_COLORS[table.status] || "lightgrey",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(PATHS.tables.detail(table.id))}
                >
                  <h4>{table.name}</h4>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ))}
    </>
  );
};

export default TableList;
