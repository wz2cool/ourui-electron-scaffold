import * as React from 'react';
import { Layout, Row, Col, Divider } from 'antd';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import type { User } from '../services/database';

const { Content } = Layout;

const UserManagement: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleUserAdded = (user: User) => {
    // 当用户添加成功后，触发用户列表刷新
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <UserForm onUserAdded={handleUserAdded} />
          </Col>
          <Col xs={24} lg={14}>
            <UserList refreshTrigger={refreshTrigger} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UserManagement;