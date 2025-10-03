import React from 'react';
import { Card, Row, Col, Typography, Tag, Divider, Timeline, Avatar } from 'antd';
import {
  GithubOutlined,
  RocketOutlined,
  BugOutlined,
  HeartOutlined,
  CodeOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  const techStack = [
    { name: 'Electron', version: '^38.2.0', color: '#47848F' },
    { name: 'React', version: '^18.3.1', color: '#61DAFB' },
    { name: 'TypeScript', version: '~4.5.4', color: '#3178C6' },
    { name: 'Ant Design', version: '^5.27.4', color: '#1890FF' },
    { name: 'React Router', version: 'latest', color: '#CA4245' },
    { name: 'better-sqlite3', version: '^12.4.1', color: '#003B57' },
    { name: 'Drizzle ORM', version: '^0.44.6', color: '#C5F74F' },
    { name: 'Webpack', version: 'latest', color: '#8DD6F9' },
  ];

  const features = [
    {
      title: '跨平台支持',
      description: '基于 Electron 构建，支持 Windows、macOS 和 Linux',
      icon: <RocketOutlined style={{ color: '#1890ff' }} />,
    },
    {
      title: '现代化开发',
      description: '使用 React 18 + TypeScript + Webpack 现代化开发栈',
      icon: <CodeOutlined style={{ color: '#52c41a' }} />,
    },
    {
      title: '本地数据库',
      description: '集成 SQLite + Drizzle ORM 提供强大的数据存储能力',
      icon: <BugOutlined style={{ color: '#faad14' }} />,
    },
    {
      title: '美观界面',
      description: '基于 Ant Design 5.x 设计系统，提供一致的用户体验',
      icon: <HeartOutlined style={{ color: '#f5222d' }} />,
    },
  ];

  return (
    <div>
      <Typography style={{ marginBottom: 24 }}>
        <Title level={2}>
          <TeamOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          关于 OurUI Tool v3
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          OurUI Tool v3 是一个现代化的桌面应用程序开发框架，
          集成了当前最流行和稳定的前端技术栈，为开发者提供高效的开发体验。
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="技术栈" bordered={false}>
            <div style={{ marginBottom: 16 }}>
              {techStack.map((tech, index) => (
                <Tag
                  key={index}
                  color={tech.color}
                  style={{ margin: '4px', fontSize: '12px' }}
                >
                  {tech.name} {tech.version}
                </Tag>
              ))}
            </div>
            <Divider />
            <Paragraph>
              <Text strong>核心特性：</Text>
            </Paragraph>
            <ul>
              <li>🚀 基于 Electron 的跨平台桌面应用</li>
              <li>⚛️ React 18 + TypeScript 现代化开发</li>
              <li>🎨 Ant Design 5.x 企业级 UI 组件</li>
              <li>🗄️ SQLite + Drizzle ORM 本地数据库</li>
              <li>📦 Webpack + Electron Forge 构建工具链</li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="功能特性" bordered={false}>
            {features.map((feature, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  {feature.icon}
                  <Text strong style={{ marginLeft: 8 }}>
                    {feature.title}
                  </Text>
                </div>
                <Paragraph style={{ marginLeft: 24, marginBottom: 0 }}>
                  {feature.description}
                </Paragraph>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="开发历程" bordered={false}>
            <Timeline
              items={[
                {
                  color: 'green',
                  children: (
                    <div>
                      <Text strong>项目初始化</Text>
                      <br />
                      <Text type="secondary">
                        使用 Electron Forge 创建项目基础结构，配置 TypeScript 和 Webpack
                      </Text>
                    </div>
                  ),
                },
                {
                  color: 'blue',
                  children: (
                    <div>
                      <Text strong>集成 React 18</Text>
                      <br />
                      <Text type="secondary">
                        添加 React 18 支持，配置现代化的前端开发环境
                      </Text>
                    </div>
                  ),
                },
                {
                  color: 'purple',
                  children: (
                    <div>
                      <Text strong>UI 框架集成</Text>
                      <br />
                      <Text type="secondary">
                        集成 Ant Design 5.x，提供丰富的 UI 组件和设计系统
                      </Text>
                    </div>
                  ),
                },
                {
                  color: 'orange',
                  children: (
                    <div>
                      <Text strong>数据库支持</Text>
                      <br />
                      <Text type="secondary">
                        添加 better-sqlite3 和 Drizzle ORM，提供本地数据存储能力
                      </Text>
                    </div>
                  ),
                },
                {
                  color: 'red',
                  children: (
                    <div>
                      <Text strong>路由系统</Text>
                      <br />
                      <Text type="secondary">
                        集成 React Router，实现单页应用的路由管理
                      </Text>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="项目信息" bordered={false}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Avatar
                size={64}
                icon={<GithubOutlined />}
                style={{ backgroundColor: '#1890ff' }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Title level={4}>OurUI Tool v3</Title>
              <Paragraph>
                <Text type="secondary">版本：3.0.0</Text>
                <br />
                <Text type="secondary">许可证：MIT</Text>
                <br />
                <Text type="secondary">
                  构建时间：{new Date().toLocaleDateString()}
                </Text>
              </Paragraph>
            </div>
            <Divider />
            <Paragraph style={{ textAlign: 'center' }}>
              <Text>
                Made with <HeartOutlined style={{ color: '#f5222d' }} /> by OurUI Team
              </Text>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;