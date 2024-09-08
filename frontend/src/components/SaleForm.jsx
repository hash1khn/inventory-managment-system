import React, { useState } from 'react';
import { logSale } from '../services/salesService';

const SaleForm = ({ onSale }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saleData = { customerName, customerEmail, deviceId, salePrice };

    try {
      const response = await logSale(saleData);  // Call the logSale API service
      if (response) {
        onSale(saleData);  // Call parent function to update UI after sale is logged
        setCustomerName('');
        setCustomerEmail('');
        setDeviceId('');
        setSalePrice('');
      }
    } catch (err) {
      console.error('Error logging sale:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log a Sale</h3>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Sale Price"
        value={salePrice}
        onChange={(e) => setSalePrice(e.target.value)}
        required
      />
      <button type="submit">Submit Sale</button>
    </form>
  );
};

export default SaleForm;
