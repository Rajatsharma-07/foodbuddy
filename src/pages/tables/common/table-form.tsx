import {
    Button,
    Card,
    Col,
    Flex,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Switch,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TableCategory } from "../../../@types/table-categories/table-categories";
import { Table } from "../../../@types/tables/tables";
import { PATHS } from "../../../routes/paths";
import { fetchTableCategoryList } from "../../../utils/api/table-categories/table-categories";
import { createTable, updateTable } from "../../../utils/api/tables/tables";
import { TABLE_STATUS } from "../../../utils/constants/constants";

const { Option } = Select;
const { Text } = Typography;

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  table_data?: Table;
};

const TableForm = ({ add, detail, edit, table_data }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [tableCategories, setTableCategories] = useState<TableCategory[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!detail) {
      const fetchTableCategories = async () => {
        const response = await fetchTableCategoryList({
          page: 1,
          limit: 1000,
          sort_field: "id",
          sort_order: "asc",
        });
        setTableCategories(response.data);
      };
      fetchTableCategories();
    }
  }, [detail]);

  useEffect(() => {
    if ((edit || detail) && table_data) {
      form.setFieldsValue({
        number_of_tables: 0,
        name: table_data.name,
        table_category_id: table_data.category_id,
        status: table_data.status,
        is_active: table_data.is_active,
      });
    }
  }, [table_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createTable(values);
        messageApi.success("Table created successfully!");
        navigate(PATHS.tables.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id && (await updateTable(Number(id), values));
        messageApi.success("Table updated successfully!");
        navigate(PATHS.tables.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={{
            is_active: true,
          }}
        >
          <Row gutter={16}>
            {add && (
              <Col span={12}>
                <Form.Item
                  label="Number of Tables"
                  name="number_of_tables"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={1}
                    max={1000}
                    placeholder="Enter number of tables"
                    variant={detail ? "filled" : "outlined"}
                    disabled={isDisabled}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            )}
            <Col span={12}>
              <Form.Item label="Table Category" name="table_category_id">
                {detail ? (
                  <Text>{`${table_data?.category?.name}(${table_data?.category?.prefix})`}</Text>
                ) : (
                  <Select
                    variant={detail ? "filled" : "outlined"}
                    disabled={isDisabled}
                  >
                    <Option key={null} value={null}>
                      Select Table Category
                    </Option>
                    {tableCategories.map((table_category) => (
                      <Option key={table_category.id} value={table_category.id}>
                        {`${table_category.name}(${table_category.prefix})`}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            {!add && (
              <>
                <Col span={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Enter name"
                      variant={detail ? "filled" : "outlined"}
                      disabled={isDisabled}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Status" name="status">
                    {detail ? (
                      <Text style={{ textTransform: "capitalize" }}>
                        {table_data?.status?.replace(/_/g, " ")}
                      </Text>
                    ) : (
                      <Select
                        variant={detail ? "filled" : "outlined"}
                        disabled={isDisabled}
                        style={{ textTransform: "capitalize" }}
                      >
                        {Object.values(TABLE_STATUS).map((status: any) => (
                          <Option
                            key={status}
                            value={status}
                            style={{ textTransform: "capitalize" }}
                          >
                            {status.replace(/_/g, " ")}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Is Active" name="is_active">
                    <Switch disabled={isDisabled} />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>

          {!detail && (
            <Flex justify="end" align="center" gap={10}>
              <Button
                variant="outlined"
                htmlType="submit"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {add ? "Create" : "Update"}
              </Button>
            </Flex>
          )}
        </Form>
      </Card>
    </>
  );
};

export default TableForm;
