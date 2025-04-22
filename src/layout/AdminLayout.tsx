import React from "react";
import { Layout } from "antd";
import "./AdminLayout.css";
import AdminHeader from "./header/AdminHeader";
import AdminSidebar from "./sidebar/AdminSidebar";

const { Content } = Layout;

type props = {
  children: React.ReactElement;
};

const AdminLayout = ({ children }: props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content
          style={{
            maxWidth: "100vw",
            padding: 24,
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            position: "relative",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
