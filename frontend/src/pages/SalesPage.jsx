import React, { useState } from 'react';
import SaleForm from '../components/SaleForm';

const SalesPage = () => {
  const [sales, setSales] = useState([]);

  const handleSaleLogged = (newSale) => {
    setSales([...sales, newSale]);
  };

  return (
    <div>
      <h2>Sales</h2>
      <ul>
        {sales.map((sale, index) => (
          <li key={index}>
            Sale: {sale.customerName} - {sale.salePrice}
          </li>
        ))}
      </ul>
      <SaleForm onSale={handleSaleLogged} />
    </div>
  );
};

export default SalesPage;
