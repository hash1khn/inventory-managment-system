import React, { useState, useEffect } from 'react';
import { getInventory } from '../services/inventoryService';
import InventoryForm from '../components/InventoryForm';

const InventoryPage = () => {
  const [devices, setDevices] = useState([]);

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  return (
    <div>
      <h2>Add Device</h2>
      <InventoryForm onAdd={handleAddDevice} />
    </div>
  );
};

export default InventoryPage;
