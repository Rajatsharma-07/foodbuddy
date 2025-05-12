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
import { MenuCategory } from "../../../@types/menu-categories/menu-category";
import { PATHS } from "../../../routes/paths";
import {
  createMenuCategory,
  updateMenuCategory,
} from "../../../utils/api/menu-categories/menu-categories";

const { Option } = Select;

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  menu_category_data?: MenuCategory;
};

const MenuCategoryForm = ({ add, detail, edit, menu_category_data }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if ((edit || detail) && menu_category_data) {
      form.setFieldsValue({
        name: menu_category_data.name,
      });
    }
  }, [menu_category_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createMenuCategory(values);
        messageApi.success("Menu Category created successfully!");
        navigate(PATHS.menu_categories.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id && (await updateMenuCategory(Number(id), values));
        messageApi.success("Menu Category updated successfully!");
        navigate(PATHS.menu_categories.list);
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

export default MenuCategoryForm;
