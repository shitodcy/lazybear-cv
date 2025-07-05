import axios from 'axios';
import router from '../router';

const apiClient = axios.create({
  baseURL: '/api',
});

// Interceptor untuk MENAMBAHKAN token ke header setiap request
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Interceptor untuk menangani respons error (misal: token kedaluwarsa)
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('user-token');
      if (router.currentRoute.value.name !== 'Login') {
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;