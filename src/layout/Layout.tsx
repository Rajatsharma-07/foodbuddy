import { Layout } from "antd";
import React from "react";
import styles from "./Layout.module.css";
import Sidebar from "./sidebar/Sidebar";
import ResHeader from "./header/Header";

const { Content } = Layout;

type props = {
  children: React.ReactElement;
};

const ResLayout = ({ children }: props) => {
  return (
    <Layout className="res-layout-wrapper" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <ResHeader />
        <Content
          className={styles.content}
          style={{
            maxWidth: "100vw",
            padding: 24,
            backgroundColor: "white",
            color: "var(--text-color)",
            position: "relative",
          }}
        >
          <div className={styles.dashboardContainer}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ResLayout;
