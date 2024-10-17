import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Table, message } from 'antd';
import { logSale } from '../services/salesService';
import { getInventory } from '../services/inventoryService'; // Ensure you have this service to fetch devices

const InitiateSalePage = () => {
  const [form] = Form.useForm();
  const [devices, setDevices] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({}); // State to manage quantities

  // Fetch all devices when the component mounts
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getInventory();
        setDevices(response); // Assuming the response is an array of devices
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };
    fetchDevices();
  }, []);

  const handleAddToCart = (deviceId) => {
    const quantity = quantities[deviceId] || 0; // Get quantity from state
    if (quantity > 0) {
      const existingItem = cart.find(item => item.deviceId === deviceId);
      if (existingItem) {
        // Update quantity if already in cart
        setCart(cart.map(item => 
          item.deviceId === deviceId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        ));
      } else {
        // Add new item to cart
        setCart((prevCart) => [...prevCart, { deviceId, quantity }]);
      }
      message.success(`Added ${quantity} of device ID: ${deviceId} to the cart.`);
    } else {
      message.error('Quantity must be greater than 0');
    }
  };

  const handleQuantityChange = (deviceId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [deviceId]: value,
    }));
  };

  const handleSubmit = async (values) => {
    console.log('Form values:', values);
    const salesData = { ...values, cart }; // Include cart data in the sales log
    
    try {
      const response = await logSale(salesData);
      console.log('Sale logged successfully:', response);
      form.resetFields();
      setCart([]); // Clear the cart after successful sale
      setQuantities({}); // Reset quantities
    } catch (error) {
      console.error('Error logging sale:', error);
    }
  };

  const deviceColumns = [
    {
      title: 'Device Type',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Model Name',
      dataIndex: 'modelName',
      key: 'modelName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text.toFixed(2)}`, // Format price
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (text, record) => (
        <InputNumber
          min={1}
          style={{ width: '60%' }}
          placeholder="Qty"
          onChange={(value) => handleQuantityChange(record._id, value)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleAddToCart(record._id)}
        >
          Add to Cart
        </Button>
      ),
    },
  ];

  const cartColumns = [
    {
      title: 'Device ID',
      dataIndex: 'deviceId',
      key: 'deviceId',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>Available Devices</h3>
      <Table
        dataSource={devices}
        columns={deviceColumns}
        rowKey="_id"
        pagination={false}
      />
      
      <h3>Cart</h3>
      <Table
        dataSource={cart}
        columns={cartColumns}
        rowKey="deviceId"
        pagination={false}
      />
      
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
            { type: 'email', message: 'Please enter a valid email' },
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
