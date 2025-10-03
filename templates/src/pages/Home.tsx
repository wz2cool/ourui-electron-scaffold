import React from 'react';
import { Card, Row, Col, Statistic, Button, Typography, Space } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  ArrowUpOutlined,
  DownloadOutlined,
  RocketOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <Typography style={{ marginBottom: 24 }}>
        <Title level={2}>
          <RocketOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          欢迎来到 OurUI Tool v3
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          这是一个基于 Electron + React 18 + Ant Design 5 + TypeScript 构建的现代化桌面应用程序。
          集成了 better-sqlite3 和 Drizzle ORM 提供强大的本地数据库支持。
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="订单数量"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="收入"
              value={112893}
              prefix={<DollarCircleOutlined />}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="下载量"
              value={1128}
              prefix={<DownloadOutlined />}
              suffix="次"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="功能特性" bordered={false}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Title level={4}>🚀 现代化技术栈</Title>
                <Paragraph>
                  使用最新的 React 18、Ant Design 5、TypeScript 等技术构建，
                  提供出色的开发体验和用户体验。
                </Paragraph>
              </div>
              <div>
                <Title level={4}>💾 本地数据库支持</Title>
                <Paragraph>
                  集成 better-sqlite3 和 Drizzle ORM，提供高性能的本地数据存储解决方案。
                </Paragraph>
              </div>
              <div>
                <Title level={4}>🎨 美观的界面设计</Title>
                <Paragraph>
                  基于 Ant Design 设计语言，提供一致性强、美观易用的用户界面。
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="快速开始" bordered={false}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Button type="primary" size="large" block>
                开始使用
              </Button>
              <Button size="large" block>
                查看文档
              </Button>
              <Button size="large" block>
                GitHub 仓库
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;