import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';  // useNavigate instead of useHistory
import './RegisterPage.css'; // Import the CSS file

const { Title } = Typography;

const RegisterPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    const { ownerName, storeName, email, password } = values;
    try {
      await register(ownerName, storeName, email, password);
      navigate('/login');  // Redirect to login page after registration
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <Title level={2} className="register-title">Register</Title>
      <Form
        name="register"
        onFinish={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Form.Item
          name="ownerName"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input 
            type="text" 
            placeholder="Owner Name" 
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="storeName"
          rules={[{ required: true, message: 'Please input your store name!' }]}
        >
          <Input 
            type="text" 
            placeholder="Store Name" 
            size="large"
          />
        </Form.Item>
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
            htmlType="submit" 
            size="large"
            className="ant-btn-custom"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" showIcon className="error-alert" />}
    </div>
  );
};

export default RegisterPage;
