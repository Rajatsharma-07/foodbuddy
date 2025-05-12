import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import DarkModeLogo from "../../assets/logo/DarkModeLogo";
import { HEADER_HEIGHT } from "../../utils/constants/constants";
import { navigationItems } from "./navigation/sidebar-navigation";
import './Sidebar.css'

const { Sider } = Layout;

const Sidebar = () => {
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
        height: "100vh",
        backgroundColor: "var(--siderbar-bg-color)",
        color: "whitesmoke",
        overflow: "auto",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
    >
      <div className="demo-logo-vertical" style={{ height: HEADER_HEIGHT }}>
        <DarkModeLogo
          bgColor={"#222222"}
          foodColor={"white"}
          buddyColor="var(--primary-color)"
        />
      </div>
      <Menu
        className="custom-sidebar-menu"
        items={navigationItems.map((item) => ({
          icon: item.icon,
          key: item.key,
          label: item.label,
          onClick: () => navigate(item.url), // Navigate on click
        }))}
        selectedKeys={[selectedKey]}
        style={{
          backgroundColor: "transparent",
        }}
        theme={"dark"}
      />
    </Sider>
  );
};

export default Sidebar;
