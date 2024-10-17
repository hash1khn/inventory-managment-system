import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { addDevice } from '../services/inventoryService'; // Import addDevice

const AddDevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [form] = Form.useForm(); // Create form instance

  const handleAddDevice = async (newDevice) => {
    try {
      console.log('Attempting to add device:', newDevice); // Log the device data being submitted
      const addedDevice = await addDevice(newDevice);
      console.log('Device added successfully:', addedDevice);
      setDevices([...devices, addedDevice]);
      form.resetFields(); // Reset form fields after successful addition
      message.success('Device added successfully!');
    } catch (error) {
      console.error('Error adding device:', error);
      message.error('Error adding device. Please try again.'); // Show an error message to the user
    }
  };

  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values); // Log the form values before sending
    handleAddDevice(values); // Pass values to handleAddDevice
  };

  return (
    <div>
      <h2>Add Device</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Device Type"
          name="deviceType"
          rules={[{ required: true, message: 'Please enter the Device Type' }]}>
          <div style={{ width: '400px' }}>
            <Input />
          </div>
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: 'Please enter the brand' }]}>
          <div style={{ width: '400px' }}>
            <Input />
          </div>
        </Form.Item>

        <Form.Item
          label="Model Name"
          name="modelName"
          rules={[{ required: true, message: 'Please enter the model name' }]}>
          <div style={{ width: '400px' }}>
            <Input />
          </div>
        </Form.Item>

        <Form.Item
          label="Quantity Available"
          name="quantityAvailable"
          rules={[{ required: true, message: 'Please enter the quantity available' }]}>
          <div style={{ width: '400px' }}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </div>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price' }]}>
          <div style={{ width: '400px' }}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="ant-btn-custom">
            Add Device
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDevicePage;
