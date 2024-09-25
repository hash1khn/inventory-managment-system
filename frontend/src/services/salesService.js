import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sales';

export const logSale = async (saleData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/initiate-sale`, saleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getReceipts = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/get-all-receipts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
