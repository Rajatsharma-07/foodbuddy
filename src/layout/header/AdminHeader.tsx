import React, { useContext, useEffect, useState } from "react";
import { Avatar, Dropdown, Flex, Layout, MenuProps } from "antd";
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import ThemeDrawer from "./ThemeDrawer";
import { ThemeContext } from "../../theme/ThemeContext";
import { HEADER_HEIGHT, SCROLLED_HEADER_HEIGHT } from "../../constants/constants";
import "./AdminHeader.css"; // Import CSS file

const { Header } = Layout;

const items: MenuProps['items'] = [
  {
    label: (
      <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
        Profile
      </a>
    ),
    icon: <UserOutlined />,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: 'Logout',
    icon: <LogoutOutlined />, 
    key: '2',
  },
];

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { primaryColor } = themeContext;

  return (
    <Header className={`admin-header ${isScrolled ? "scrolled" : "default"}`}>
      <Flex gap="large" align="end" justify="end" className="header-actions">
        <Flex justify={'center'} align={'center'} gap="large">
          <SettingOutlined className="setting-icon" onClick={() => setOpen(true)} />
          <Dropdown menu={{ items }} trigger={['click']}>
            <Avatar size={40} className="avatar" style={{ backgroundColor: primaryColor }}>
              U
            </Avatar>
          </Dropdown>
        </Flex>
      </Flex>
      <ThemeDrawer open={open} setOpen={setOpen} />
    </Header>
  );
};

export default AdminHeader;
