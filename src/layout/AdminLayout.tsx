import React from "react";
import { Layout } from "antd";
import styles from "./AdminLayout.module.css";
import AdminHeader from "./header/AdminHeader";
import AdminSidebar from "./sidebar/AdminSidebar";

const { Content } = Layout;

type props = {
  children: React.ReactElement;
};

const AdminLayout = ({ children }: props) => {
  return (
    <Layout className="admin-layout-wrapper" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content
        className={styles.content}
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
