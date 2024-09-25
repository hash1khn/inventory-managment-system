import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

const InventoryForm = ({ onAdd }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onAdd(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Model Name"
        name="modelName"
        rules={[{ required: true, message: 'Please enter the model name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter the price' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Quantity Available"
        name="quantityAvailable"
        rules={[{ required: true, message: 'Please enter the quantity available' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Product Number"
        name="productNumber"
        rules={[{ required: true, message: 'Please enter the product number' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
      <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            className="ant-btn-custom"
          >
            Add Device
          </Button>
      </Form.Item>
    </Form>
  );
};

export default InventoryForm;
