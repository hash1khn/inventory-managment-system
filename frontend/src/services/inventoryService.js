import axios from 'axios';

const API_URL = 'http://localhost:5000/api/inventory';

export const getInventory = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/get-all-devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addDevice = async (deviceData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/add-device`, deviceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
