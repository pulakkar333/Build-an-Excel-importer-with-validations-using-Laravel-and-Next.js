import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // or your actual Laravel API URL
});

export default api;