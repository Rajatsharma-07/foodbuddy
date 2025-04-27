import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import { Restaurant } from "../../../@types/restaurants/restaurant";
import { UserData } from "../../../@types/users/user";
import { fetchRestaurantList } from "../../../utils/api/restaurant/restaurant";
import { ROLES } from "../../../utils/constants/constants";
import { createUser, updateUser } from "../../../utils/api/user/user";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";

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
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!detail) {
      setLoader(true);
      const getRestaurants = async () => {
        try {
          const response = await fetchRestaurantList({});
          setRestaurantList(response.data);
        } catch (error: any) {
          console.error(error);
        }
        setLoader(false);
      };
      getRestaurants();
    }
  }, [detail]);

  useEffect(() => {
    if ((edit || detail) && user_data) {
      form.setFieldsValue({
        first_name: user_data.first_name,
        last_name: user_data.last_name,
        email: user_data.email,
        is_active: user_data.is_active,
        is_superuser: user_data.is_superuser,
        role_id: user_data.role_id,
        restaurant_id: user_data.restaurant_id ?? undefined,
        role: user_data?.role?.name,
        restaurant: user_data?.role?.name,
      });
    }
  }, [user_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createUser(values);
        messageApi.success("User created successfully!");
        navigate(PATH_ADMIN.users.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id && (await updateUser(Number(id), values));
        messageApi.success("User updated successfully!");
        navigate(PATH_ADMIN.users.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    }
  };

  return (
    <>
      {contextHolder}
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Restaurant"
              name={!detail ? "restaurant_id" : "restaurant"}
            >
              {!detail ? (
                <Select
                  variant={detail ? "filled" : "outlined"}
                  disabled={isDisabled}
                  allowClear
                  placeholder="Select restaurant (optional)"
                  loading={loader}
                >
                  <Option value={null}>Please Select a Restaurant</Option>
                  {restaurantList.map((restaurant) => (
                    <Option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
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

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Is Superuser"
              name="is_superuser"
              valuePropName="checked"
            >
              <Switch disabled={isDisabled} />
            </Form.Item>
            <Form.Item
              label="Is Active"
              name="is_active"
              valuePropName="checked"
            >
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
    </>
  );
};

export default UserForm;
