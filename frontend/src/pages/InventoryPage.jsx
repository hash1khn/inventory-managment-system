import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { getInventory } from '../services/inventoryService';

const InventoryPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const data = await getInventory();
      setDevices(data);
    };
    fetchDevices();
  }, []);

  // Define columns for the Ant Design Table
  const columns = [
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
      title: 'Quantity Available',
      dataIndex: 'quantityAvailable',
      key: 'quantityAvailable',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`, // Format price with $
    },
  ];

  return (
    <div>
      <h2>Inventory</h2>
      {/* Ant Design Table component with dynamic data */}
      <Table columns={columns} dataSource={devices} rowKey="_id" />
    </div>
  );
};

export default InventoryPage;
