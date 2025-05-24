import {
    Button,
    Card,
    Col,
    Flex,
    Form,
    Input,
    message,
    Row,
    Select,
} from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TableCategory } from "../../../@types/table-categories/table-categories";
import { PATHS } from "../../../routes/paths";
import {
    createTableCategory,
    updateTableCategory,
} from "../../../utils/api/table-categories/table-categories";

const { Option } = Select;

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  table_category_data?: TableCategory;
};

const TableCategoryForm = ({
  add,
  detail,
  edit,
  table_category_data,
}: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if ((edit || detail) && table_category_data) {
      form.setFieldsValue({
        name: table_category_data.name,
        prefix: table_category_data.prefix,
      });
    }
  }, [table_category_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createTableCategory(values);
        messageApi.success("Table Category created successfully!");
        navigate(PATHS.table_categories.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id && (await updateTableCategory(Number(id), values));
        messageApi.success("Table Category updated successfully!");
        navigate(PATHS.table_categories.list);
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
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Prefix" name="prefix">
                <Input
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
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

export default TableCategoryForm;
