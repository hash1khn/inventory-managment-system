import React, { useState } from 'react';
import { addDevice } from '../services/inventoryService';

const InventoryForm = ({ onAdd }) => {
  const [deviceType, setDeviceType] = useState('');
  const [modelName, setModelName] = useState('');
  const [price, setPrice] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDevice = { deviceType, modelName, price, quantityAvailable };

    try {
      const response = await addDevice(newDevice);  // Call the addDevice API service
      if (response) {
        onAdd(newDevice);  // Call parent function to update the inventory list
        setDeviceType('');
        setModelName('');
        setPrice('');
        setQuantityAvailable('');
      }
    } catch (err) {
      console.error('Error adding device:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Device</h3>
      <input
        type="text"
        placeholder="Device Type"
        value={deviceType}
        onChange={(e) => setDeviceType(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Model Name"
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity Available"
        value={quantityAvailable}
        onChange={(e) => setQuantityAvailable(e.target.value)}
        required
      />
      <button type="submit">Add Device</button>
    </form>
  );
};

export default InventoryForm;
