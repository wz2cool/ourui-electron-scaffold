import * as React from 'react';
import { Table, Card, Button, Space, message, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { UserService } from '../services/userService';
import type { User } from '../services/database';
import type { ColumnsType } from 'antd/es/table';

interface UserListProps {
  refreshTrigger?: number;
}

const UserList: React.FC<UserListProps> = ({ refreshTrigger }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userList = await UserService.getAllUsers();
      setUsers(userList);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      message.error(`获取用户列表失败: ${error.message || '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await UserService.deleteUser(id);
      message.success('用户删除成功！');
      loadUsers(); // 重新加载列表
    } catch (error) {
      console.error('删除用户失败:', error);
      message.error(`删除用户失败: ${error.message || '未知错误'}`);
    }
  };

  React.useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <Tag color="blue">{email}</Tag>
      ),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => phone || '-',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: (address: string) => address || '-',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => {
        if (!createdAt) return '-';
        try {
          return new Date(createdAt).toLocaleString('zh-CN');
        } catch {
          return createdAt;
        }
      },
      sorter: (a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              message.info('编辑功能待实现');
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            description="删除后无法恢复"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="用户列表"
      extra={
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={loadUsers}
          loading={loading}
        >
          刷新
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
        }}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default UserList;