import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sales';

export const logSale = async (saleData) => {
  const token = localStorage.getItem('token');
  
  // Debugging: log the data being sent and the URL
  console.log('Initiating sale with data:', saleData);
  console.log('Requesting URL:', `${API_URL}/initiate-sale`);
  console.log('Authorization token:', token);

  try {
    const response = await axios.post(`${API_URL}/initiate-sale`, saleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Debugging: log the response from the API
    console.log('Sale initiated successfully:', response.data);
    return response.data;

  } catch (error) {
    // Debugging: log the error if the request fails
    console.error('Error initiating sale:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to handle it further if necessary
  }
};

export const getReceipts = async () => {
  const token = localStorage.getItem('token');

  // Debugging: log the request details
  console.log('Fetching all receipts');
  console.log('Requesting URL:', `${API_URL}/get-all-receipts`);
  console.log('Authorization token:', token);

  try {
    const response = await axios.get(`${API_URL}/get-all-receipts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Debugging: log the response from the API
    console.log('Receipts fetched successfully:', response.data);
    return response.data;

  } catch (error) {
    // Debugging: log the error if the request fails
    console.error('Error fetching receipts:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to handle it further if necessary
  }
};
// New function to get receipt by ID
export const getReceiptById = async (receiptId) => {
  const token = localStorage.getItem('token');

  // Debugging: log the request details
  console.log(`Fetching receipt with ID: ${receiptId}`);
  console.log('Requesting URL:', `${API_URL}/${receiptId}`);
  console.log('Authorization token:', token);

  try {
    const response = await axios.get(`${API_URL}/${receiptId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Debugging: log the response from the API
    console.log('Receipt fetched successfully:', response.data);
    return response.data;

  } catch (error) {
    // Debugging: log the error if the request fails
    console.error('Error fetching receipt by ID:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to handle it further if necessary
  }
};