import React, { useState, useEffect } from 'react';
import { getInventory } from '../services/inventoryService';
import InventoryForm from '../components/InventoryForm';

const InventoryPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const data = await getInventory();
      setDevices(data);
    };
    fetchDevices();
  }, []);

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  return (
    <div>
      <h2>Inventory</h2>
      
        {devices.map((device) => (
          <p key={device._id}>
            {device.modelName} - ${device.price} ({device.quantityAvailable} available)
          </p>
        ))}

      <h2>Add Device</h2>

      
      <InventoryForm onAdd={handleAddDevice} />
    </div>
  );
};

export default InventoryPage;
