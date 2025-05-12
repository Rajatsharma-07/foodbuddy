import {
  DownOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Input,
  Layout,
  MenuProps,
  Tag
} from "antd";
import { useEffect, useState } from "react";
import { logout } from "../../utils/api/user/user";
import "./Header.css";
import { useUser } from "../../context/user-context";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    label: (
      <a
        href="https://www.antgroup.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Profile
      </a>
    ),
    icon: <UserOutlined />,
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "Logout",
    icon: <LogoutOutlined />,
    key: "2",
  },
];

const ResHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {user, isLoading, updateUser} = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "2") {
      await logout();
      updateUser();
    }
  };

  return (
    <Header className={`header ${isScrolled ? "scrolled" : "default"}`} style={{zIndex: 2, backgroundColor: 'white'}}>
      <Flex
        gap="large"
        align="center"
        justify="space-between"
        className="header-actions"
      >
        <Flex
          justify={"center"}
          align={"center"}
          gap="large"
          style={{ width: "60%" }}
        >
          <Input
            placeholder="Type to search..."
            style={{
              borderColor: "lightgray",
              minWidth: "100%",
              borderRadius: "50px",
              height: "48px",
              padding: "0 16px",
              fontSize: "16px",
            }}
          />
        </Flex>
        <Flex justify={"center"} align={"center"} gap="large">
          <Badge count={1}><NotificationOutlined className="setting-icon" /></Badge>
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
            overlayStyle={{zIndex: 3}}
          >
            <Tag
              style={{
                width: "auto", // optional
                height: "48px",
                borderRadius: "50px",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Avatar
                size={30}
                className="avatar"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                {user?.first_name.charAt(0).toUpperCase()}
              </Avatar>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1.2",
                }}
              >
                <span style={{ color: "gray", fontSize: "12px", textTransform: 'capitalize' }}>
                  {user?.role}
                </span>
                <span
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {`${user?.first_name} ${user?.last_name}`}
                </span>
              </div>

              <DownOutlined style={{ fontSize: "12px", color: "gray" }} />
            </Tag>
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  );
};

export default ResHeader;
