import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

import { useAuth } from '../context/AuthContext';

export const login = async (email, password) => {
  const { login } = useAuth();
  const response = await axios.post(`${API_URL}/login`, { email, password });

  if (response.data.token) {
    login(response.data.token);  // Use AuthContext to save token
  }

  return response.data;
};

export const register = async (ownerName, storeName, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { ownerName, storeName, email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
