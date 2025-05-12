import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import DarkModeLogo from "../../assets/logo/DarkModeLogo";
import LightModeLogo from "../../assets/logo/LightModeLogo";
import { HEADER_HEIGHT } from "../../utils/constants/constants";
import { navigationItems } from "./navigation/admin-sidebar-navigation";

const { Sider } = Layout;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        borderColor: "rgba(5,5,5,0.06)",
      }}
    >
      <div className="demo-logo-vertical" style={{ height: HEADER_HEIGHT }}>
        <LightModeLogo
          bgColor={"var(--bg-color)"}
          foodColor={"black"}
          buddyColor={"var(--primary-color)"}
        />
      </div>
      <Menu
        theme="light"
        selectedKeys={[selectedKey]}
        items={navigationItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          onClick: () => navigate(item.url),
          style:
            selectedKey === item.key
              ? {
                  backgroundColor:
                    "color-mix(in srgb, var(--primary-color) 20%, white)",
                  color: "var(--primary-color)",
                }
              : {},
        }))}
        style={{
          borderRight: "none",
        }}
      />
    </Sider>
  );
};

export default AdminSidebar;
