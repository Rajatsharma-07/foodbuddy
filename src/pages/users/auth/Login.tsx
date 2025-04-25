import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginApiBodyPayload } from "../../../@types/users/user";
import { PATH_ADMIN } from "../../../routes/paths";
import { login } from "../../../utils/api/user/user";

type FieldType = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data: LoginApiBodyPayload = {
      ...values,
      admin: location.pathname.includes("admin") ? true : false,
    };
    try {
      await login(data);
      messageApi.success("Login successful!");
      navigate(PATH_ADMIN.dashboard);
    } catch (error: any) {
      console.log(error);
      messageApi.error(error.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Card style={{ width: "40vw", height: "fit-content", top: 100 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Login;
