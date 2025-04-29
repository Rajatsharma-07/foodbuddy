import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex, Layout, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { logout } from "../../utils/api/user/admin_user";
import "./AdminHeader.css";
import { useAdminUser } from "../../context/admin-user-context";

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

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { adminUser, isLoading } = useAdminUser();

  console.log(adminUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "2") {
      await logout(); // 👈 trigger logout on "Logout" item click
    }
  };

  return (
    <Header className={`admin-header ${isScrolled ? "scrolled" : "default"}`}>
      <Flex gap="large" align="end" justify="end" className="header-actions">
        <Flex justify={"center"} align={"center"} gap="large">
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <Avatar
              size={40}
              className="avatar"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {adminUser?.first_name.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  );
};

export default AdminHeader;
