import axios from 'axios';

const DEFAULT_API_URL = 'https://kcalculator.onrender.com';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default apiClient;