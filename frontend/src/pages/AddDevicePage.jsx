import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { addDevice } from '../services/inventoryService'; // Import addDevice

const AddDevicePage = () => {
  const [devices, setDevices] = useState([]);
  const [form] = Form.useForm(); // Create form instance

  const handleAddDevice = async (newDevice) => {
    try {
      const addedDevice = await addDevice(newDevice);
      console.log('Device added successfully:', addedDevice);
      setDevices([...devices, addedDevice]);
      form.resetFields(); // Reset form fields after successful addition
    } catch (error) {
      console.error('Error adding device:', error);
      // Optionally show a user-friendly message
    }
  };
  
  const handleSubmit = (values) => {
    console.log(values);
    handleAddDevice(values); // Pass values to handleAddDevice
  };

  return (
    <div>
      <h2>Add Device</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Device Type"
                name="deviceType"
                rules={[{ required: true, message: "Please enter the Device Type" }]}>
                <div style={{ width: "400px" }}>
                    <Input /> {/* Set desired width */}
                </div>
            </Form.Item>

            <Form.Item
                label="Model Name"
                name="modelName"
                rules={[{ required: true, message: "Please enter the model name" }]}>
                <div style={{ width: "400px" }}>
                    <Input /> {/* Set desired width */}
                </div>
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter the price" }]}>
                <div style={{ width: "400px" }}>
                    <InputNumber min={0} style={{ width: "100%" }} /> {/* Set desired width */}
                </div>
            </Form.Item>

            <Form.Item
                label="Product Number"
                name="productNumber"
                rules={[{ required: true, message: "Please enter the product number" }]}>
                <div style={{ width: "400px" }}>
                    <Input /> {/* Set desired width */}
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
