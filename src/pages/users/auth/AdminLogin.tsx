import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApiBodyPayload } from "../../../@types/users/user";
import { PATH_ADMIN } from "../../../routes/paths";
import { get_otp, login } from "../../../utils/api/user/admin_user";
import { useAdminUser } from "../../../context/admin-user-context";

type FieldType = {
  phonenumber: number;
  remember: boolean;
};

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [formValues, setFormValues] = useState<FieldType>({
    phonenumber: 0,
    remember: false,
  });
  const { updateAdminUser } = useAdminUser();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const data: LoginApiBodyPayload = {
        phonenumber: formValues.phonenumber,
        otp_code: otpCode,
        remember: formValues?.remember,
        admin: true,
      };
      await login(data);
      setIsModalOpen(false);
      setOtpCode("");
      navigate(PATH_ADMIN.dashboard);
      updateAdminUser();
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOtpCode("");
  };

  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const data = {
        phonenumber: values.phonenumber,
        is_admin: true,
      };
      const otp = await get_otp(data);
      messageApi.success(otp.data);
      setFormValues(values);
      showModal();
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo: any
  ) => {
    messageApi.error(errorInfo);
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
            label="Phone Number"
            name="phonenumber"
            rules={[
              { required: true, message: "Please input your phonenumber!" },
              { len: 10, message: "Phone number should be 10 digits long!" },
            ]}
          >
            <Input />
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
              Get OTP
            </Button>
          </Form.Item>

          <Modal
            title="Enter the OTP received on your phone"
            okText="Verify OTP"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Please enter the OTP to log in to Food Buddy!</p>
            <Input
              placeholder="OTP"
              name="otp_code"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
          </Modal>
        </Form>
      </Card>
    </>
  );
};

export default Login;
