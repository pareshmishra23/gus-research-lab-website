import axios from 'axios';

// Dynamic API Base URL fallback logic
// In production/Docker, defaults to '/api' (handled via Nginx proxy)
// In local development, defaults to 'http://localhost:8080/api'
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:8080/api');

const apiClient = axios.create({
  baseURL: API_BASE,
});

apiClient.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser?.token) {
        config.headers['Authorization'] = `Bearer ${parsedUser.token}`;
      }
    } catch (_) {}
  }
  return config;
});

export default apiClient;
