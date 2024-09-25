import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { logSale } from '../services/salesService'; 

const InitiateSalePage = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log('Form values:', values);  
    
    try {
      const response = await logSale(values);
      console.log('Sale logged successfully:', response);
      form.resetFields(); // Reset the form after submission
    } catch (error) {
      console.error('Error logging sale:', error);
      // Handle the error accordingly (e.g., show a notification)
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Initiate Sale</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[{ required: true, message: 'Please enter the customer name' }]}
        >
          <Input style={{ width: '400px' }} />
        </Form.Item>

        <Form.Item
          label="Customer Email"
          name="customerEmail"
          rules={[
            { required: true, message: 'Please enter the customer email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input style={{ width: '400px' }} />
        </Form.Item>

        <Form.Item
          label="Customer Address"
          name="customerAddress"
          rules={[{ required: true, message: 'Please enter the customer address' }]}
        >
          <Input style={{ width: '400px' }} />
        </Form.Item>

        <Form.Item
          label="Customer Phone"
          name="customerPhone"
          rules={[{ required: true, message: 'Please enter the customer phone number' }]}
        >
          <Input style={{ width: '400px' }} />
        </Form.Item>

        <Form.Item
          label="Device ID"
          name="deviceId"
          rules={[{ required: true, message: 'Please enter a valid device ID' }]}
        >
          <InputNumber min={1} style={{ width: '400px' }} />
        </Form.Item>

        <Form.Item
          label="Sale Attendant"
          name="saleAttendant"
          rules={[{ required: true, message: 'Please enter the sale attendant name' }]}
        >
          <Input style={{ width: '400px' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" className="ant-btn-custom">
            Initiate Sale
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InitiateSalePage;
