import { EditOutlined } from "@ant-design/icons";
import { Button, Divider, Typography } from "antd";

import { Flex } from "antd";
import { PATHS } from "../../routes/paths";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

type Props = {
  title: string;
  button_text?: string;
  on_click_url?: string;
};

const Header = ({ title, button_text, on_click_url }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginTop: -20 }}>
        <Title level={3}>{title}</Title>
        <Button
          onClick={() => on_click_url && navigate(on_click_url)}
          icon={<EditOutlined />}
        >
          {button_text}
        </Button>
      </Flex>
    </>
  );
};

export default Header;
