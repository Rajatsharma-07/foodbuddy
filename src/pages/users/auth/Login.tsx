import {
  Button,
  Card,
  Checkbox,
  Form,
  FormProps,
  Image,
  Input,
  message,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";
import { LoginApiBodyPayload } from "../../../@types/users/user";
import { PATHS } from "../../../routes/paths";
import { useState } from "react";
import "./Login.css";
import { get_otp, login } from "../../../utils/api/user/user";
import { useUser } from "../../../context/user-context";

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
  const {updateUser} = useUser();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const data: LoginApiBodyPayload = {
        phonenumber: formValues.phonenumber,
        otp_code: otpCode,
        remember: formValues?.remember,
        admin: false,
      };
      await login(data);
      setIsModalOpen(false);
      setOtpCode("");
      navigate(PATHS.dashboard);
      updateUser();
    } catch (error: any) {
      console.log(error);
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
        is_admin: false,
      };
      const otp = await get_otp(data);
      messageApi.success(otp.data);
      setFormValues(values);
      showModal();
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contextHolder}
      <Image
        src="/login-background.jpg"
        width="100vw"
        height="100vh"
        preview={false}
        style={{ position: "relative" }}
      />
      <Card
        className="custom-login-card"
        style={{
          width: "30vw",
          position: "absolute",
          backgroundColor: "rgba(0, 255, 255, 0.9)",
        }}
      >
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
            label={<span style={{ color: "black" }}>Phone Number</span>}
            name="phonenumber"
            className="custom-phone-input"
            rules={[
              { required: true, message: "Please input your phonenumber!" },
              { len: 10, message: "Phone number should be 10 digits long!" },
              {
                pattern: /^[0-9]+$/,
                message: "Phone number should only contain digits!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox style={{ color: "black" }}>Remember me</Checkbox>
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
    </div>
  );
};

export default Login;
