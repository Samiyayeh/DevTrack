import axios from 'axios';

const api = axios.create({
  // Because of your Vite proxy, you only need '/api'
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;