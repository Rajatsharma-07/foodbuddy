import React from "react";
import { Layout, Menu } from "antd";
import "./AdminAuthLayout.css";
import DarkModeLogo from "../assets/logo/DarkModeLogo";
import LightModeLogo from "../assets/logo/LightModeLogo";

const { Header, Content } = Layout;

type props = {
  children: React.ReactElement;
};

const AdminAuthLayout = ({ children }: props) => {
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "var(--primary-color)",
        }}
      >
        <div className="demo-logo-vertical">
            <LightModeLogo
              bgColor={"var(--primary-color)"}
              foodColor={"white"}
              buddyColor={"white"}
            />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={[]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{ padding: "0 48px", backgroundColor: "var(--bg-color)" }}
      >
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            minWidth: "100%",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AdminAuthLayout;
