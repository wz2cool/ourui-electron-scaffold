import * as React from 'react';
import { Form, Input, Button, Card, message, Space } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { UserService } from '../services/userService';
import type { User } from '../services/database';

interface UserFormProps {
  onUserAdded?: (user: User) => void;
}

interface UserFormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: UserFormData) => {
    setLoading(true);
    try {
      const newUser = await UserService.addUser(values);
      message.success('用户添加成功！');
      form.resetFields();
      onUserAdded?.(newUser);
    } catch (error) {
      console.error('添加用户失败:', error);
      message.error(`添加用户失败: ${error.message || '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Card title="添加新用户" style={{ maxWidth: 600, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[
            { required: true, message: '请输入姓名' },
            { min: 2, message: '姓名至少2个字符' },
            { max: 50, message: '姓名不能超过50个字符' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="请输入姓名"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="请输入邮箱地址"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="电话"
          name="phone"
          rules={[
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="请输入手机号码（可选）"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="地址"
          name="address"
          rules={[
            { max: 200, message: '地址不能超过200个字符' }
          ]}
        >
          <Input.TextArea
            placeholder="请输入地址（可选）"
            rows={3}
            showCount
            maxLength={200}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              添加用户
            </Button>
            <Button
              htmlType="button"
              onClick={handleReset}
              size="large"
            >
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;