import axios from 'axios';

// Dynamic API Base URL fallback logic
// In production/Docker, defaults to '/api' (handled via Nginx proxy)
// In local development, defaults to 'http://localhost:8080/api'
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:8080/api');

const attachAuthToken = (config) => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser?.token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${parsedUser.token}`;
      }
    } catch (_) {}
  }
  return config;
};

// Global interceptor for standard axios instances
axios.interceptors.request.use(attachAuthToken);

const apiClient = axios.create({
  baseURL: API_BASE,
});

apiClient.interceptors.request.use(attachAuthToken);

// Handle 401/403 expired or invalid tokens cleanly
const handleAuthError = (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    const isAuthEndpoint = error.config?.url?.includes('/auth/signin');
    if (!isAuthEndpoint && localStorage.getItem('user')) {
      console.warn('Session expired or unauthorized (401/403). Clearing stale session.');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login';
      }
    }
  }
  return Promise.reject(error);
};

axios.interceptors.response.use(res => res, handleAuthError);
apiClient.interceptors.response.use(res => res, handleAuthError);

export default apiClient;
