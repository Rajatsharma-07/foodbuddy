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
  Switch,
} from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from "../../../@types/menu/menu";
import { PATHS } from "../../../routes/paths";
import { createMenu, updateMenu } from "../../../utils/api/menu/menu";

const { Option } = Select;

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  menu_data?: Menu;
};

const MenuForm = ({ add, detail, edit, menu_data }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if ((edit || detail) && menu_data) {
      form.setFieldsValue({
        name: menu_data.name,
        is_active: menu_data.is_active,
      });
    }
  }, [menu_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createMenu(values);
        messageApi.success("Menu created successfully!");
        navigate(PATHS.menus.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id && (await updateMenu(Number(id), values));
        messageApi.success("Menu updated successfully!");
        navigate(PATHS.menus.list);
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
              <Form.Item label="Is Active" name="is_active">
                <Switch disabled={isDisabled} />
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

export default MenuForm;
