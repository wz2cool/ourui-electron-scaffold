import * as React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Card, Typography, Button, Space } from 'antd';
import { HomeOutlined, InfoCircleOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import UserManagement from './pages/UserManagement';

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

// Home 页面组件
const HomePage: React.FC = () => (
  <Card title="Home Page" style={{ height: '100%' }}>
    <Title level={2}>Welcome to Our UI Tool v3! 🏠</Title>
    <Paragraph>
      This is the home page of our Electron application with React, Ant Design, and React Router integration.
    </Paragraph>
    <Space>
      <Button type="primary">Get Started</Button>
      <Button>Learn More</Button>
    </Space>
  </Card>
);

// About 页面组件
const AboutPage: React.FC = () => (
  <Card title="About Page" style={{ height: '100%' }}>
    <Title level={2}>About Our Application ℹ️</Title>
    <Paragraph>
      This application demonstrates the successful integration of:
    </Paragraph>
    <ul>
      <li>Electron - Desktop application framework</li>
      <li>React 18 - Modern UI library with concurrent features</li>
      <li>Ant Design - Professional UI component library</li>
      <li>React Router - Client-side routing</li>
      <li>TypeScript - Type-safe development</li>
    </ul>
    <Paragraph>
      Built with modern web technologies for a seamless desktop experience.
    </Paragraph>
  </Card>
);

const AppRouter: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="/users">用户管理</Link>,
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
  ];

  return (
    <Router>
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Sider 
          width={200} 
          collapsedWidth={80}
          collapsed={collapsed}
          style={{ background: '#fff' }}
        >
          <div style={{ 
            padding: '16px', 
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {!collapsed && <Title level={4} style={{ margin: 0 }}>Navigation</Title>}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{
                fontSize: '16px',
                width: 32,
                height: 32,
              }}
            />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            inlineCollapsed={collapsed}
          />
        </Sider>
        <Layout style={{ height: '100%' }}>
          <Content style={{ padding: '24px', height: '100vh', overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppRouter;