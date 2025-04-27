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
import { createRestaurant, fetchRestaurantList, updateRestaurant } from "../../../utils/api/restaurant/restaurant";
import { ROLES } from "../../../utils/constants/constants";
import { createUser, updateUser } from "../../../utils/api/user/user";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";

const { Option } = Select;

type Props = {
  add: boolean;
  edit: boolean;
  detail: boolean;
  restaurant_data?: Restaurant;
};

const RestaurantForm = ({ add, detail, edit, restaurant_data }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if ((edit || detail) && restaurant_data) {
      form.setFieldsValue({
        name: restaurant_data.name,
        address: restaurant_data.address,
        city: restaurant_data.city,
        state: restaurant_data.state,
        country: restaurant_data.country,
        pincode: restaurant_data.pincode,
        is_active: restaurant_data.is_active,
      });
    }
  }, [restaurant_data, edit, detail, form]);

  const isDisabled = detail;

  const handleFinish = async (values: any) => {
    if (add) {
      try {
        await createRestaurant(values);
        messageApi.success("Restaurant created successfully!");
        navigate(PATH_ADMIN.restaurants.list);
      } catch (error: any) {
        messageApi.error(error.message);
      }
    } else if (edit) {
      try {
        id && (await updateRestaurant(Number(id), values));
        messageApi.success("Restaurant updated successfully!");
        navigate(PATH_ADMIN.restaurants.list);
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
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter the address" }]}
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
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter the city" }]}
            >
              <Input
                variant={detail ? "filled" : "outlined"}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter the state" }]}
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
              label="Country"
              name="country"
              rules={[{ required: true, message: "Please enter the country" }]}
            >
              <Input
                variant={detail ? "filled" : "outlined"}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Pincode"
              name="pincode"
              rules={[{ required: true, message: "Please enter the pincode" }]}
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

export default RestaurantForm;
