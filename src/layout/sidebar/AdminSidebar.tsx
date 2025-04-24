import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { ThemeContext } from "../../theme/ThemeContext";
import DarkModeLogo from "../../assets/logo/DarkModeLogo";
import LightModeLogo from "../../assets/logo/LightModeLogo";
import { HEADER_HEIGHT } from "../../utils/constants/constants";
import { navigationItems } from "./navigation/admin-sidebar-navigation";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return <p>Loading...</p>;

  const { themeMode, primaryColor } = themeContext;

  const activeMenuItem = navigationItems.find((item) =>
    location.pathname.includes(item.url)
  );
  const selectedKey = activeMenuItem ? activeMenuItem.key : "1";
  return (
    <Sider
      width={275}
      style={{
        height: "100vh", // Ensure full height
        backgroundColor: "var(--bg-color)", // Apply correct background
        color: "var(--text-color)",
        overflow: "auto",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
        borderRight: "1px dashed",
        borderColor:
          themeMode === "dark" ? "rgba(255,255,255, 0.3)" : "rgba(5,5,5,0.06)",
      }}
    >
      <div className="demo-logo-vertical" style={{ height: HEADER_HEIGHT }}>
        {themeMode === "dark" ? (
          <DarkModeLogo
            bgColor={"var(--bg-color)"}
            foodColor={"white"}
            buddyColor={primaryColor}
          />
        ) : (
          <LightModeLogo
            bgColor={"var(--bg-color)"}
            foodColor={"black"}
            buddyColor={primaryColor}
          />
        )}
      </div>
      <Menu
        theme={themeMode === "dark" ? "dark" : "light"}
        selectedKeys={[selectedKey]}
        items={navigationItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          onClick: () => navigate(item.url), // Navigate on click
        }))}
      />
    </Sider>
  );
};

export default AdminSidebar;
