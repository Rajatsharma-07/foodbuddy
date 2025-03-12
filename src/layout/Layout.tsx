import React, { useContext } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Divider, Layout, Menu } from 'antd';
import { ThemeContext } from '../theme/ThemeContext';
import './Layout.css';
import AdminHeader from './header/AdminHeader';
import AdminSidebar from './sidebar/AdminSidebar';

const { Content } = Layout;

type props = {
    children: React.ReactElement
}

const AdminLayout = ({children}: props) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return <p>Loading...</p>;

  const {themeMode} = themeContext;

  return (
    <Layout style={{minHeight: "100vh"}}>
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content style={{ maxWidth: "100vw", padding: 24, backgroundColor: "var(--bg-color)", color: "var(--text-color)", position: 'relative' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;