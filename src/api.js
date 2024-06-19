// src/api.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/'
  // baseURL: 'https://backend-drab-mu.vercel.app/'
  baseURL: 'https://backend-miss-africa-maroc.vercel.app/'
});

export const getUsers = () => api.get('/users');
export const createPayment = (data) => api.post('/api/payments/create-payment', data);
export const executePayment = (data) => api.post('/api/payments/execute-payment', data);

export default api;
