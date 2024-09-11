import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory
import 'LoginPage.css';

const { Title } = Typography;

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      await login(email, password);
      navigate('/inventory');  // Redirect to inventory page after login
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="login-container">
      <Title level={2} className="login-title">Login</Title>
      <Form
        name="login"
        onFinish={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input 
            type="email" 
            placeholder="Email" 
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password 
            placeholder="Password" 
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            className="ant-btn-custom"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" showIcon className="error-alert" />}
    </div>
  );
};

export default LoginPage;
