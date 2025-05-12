import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select
} from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../../../@types/users/user";
import { useUser } from "../../../context/user-context";
import { PATHS } from "../../../routes/paths";
import { createUser, updateUser } from "../../../utils/api/user/user";
import { ROLES } from "../../../utils/constants/constants";

const { Option } = Select;

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  user_data?: UserData;
};

const UserForm = ({ add, detail, edit, user_data }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { user } = useUser();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if ((edit || detail) && user_data) {
      form.setFieldsValue({
        first_name: user_data.first_name,
        last_name: user_data.last_name,
        email: user_data.email,
        phonenumber: user_data.phonenumber,
        is_active: user_data.is_active,
        role_id: user_data.role_id,
        restaurant_id: user?.restaurant_id,
        role: user_data?.role?.name,
      });
    }
  }, [user_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createUser(values);
        messageApi.success("User created successfully!");
        navigate(PATHS.users.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id &&
          (await updateUser(Number(id), {
            ...values,
            restaurant_id: user?.restaurant_id,
          }));
        messageApi.success("User updated successfully!");
        navigate(PATHS.users.list);
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
            is_superuser: false,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phonenumber"
                rules={[
                  { required: true, message: "Please enter the phonenumber" },
                  {
                    len: 10,
                    message: "Phone number should be 10 digits long!",
                  },
                ]}
              >
                <Input
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name={!detail ? "role_id" : "role"}
                rules={[{ required: true, message: "Please select a role" }]}
              >
                {!detail ? (
                  <Select
                    variant={detail ? "filled" : "outlined"}
                    disabled={isDisabled}
                    placeholder="Select role"
                  >
                    {ROLES.map((role) => (
                      <Option key={role.id} value={role.id}>
                        {role.name}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    variant={detail ? "filled" : "outlined"}
                    disabled={isDisabled}
                  />
                )}
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

export default UserForm;
