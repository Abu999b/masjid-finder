import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  getAllUsers: () => api.get('/auth/users'),
  updateUserRole: (userId, role) => api.put(`/auth/users/${userId}/role`, { role })
};

// Masjid API
export const masjidAPI = {
  getAll: () => api.get('/masjids'),
  getNearby: (longitude, latitude, maxDistance = 5000) => 
    api.get(`/masjids/nearby?longitude=${longitude}&latitude=${latitude}&maxDistance=${maxDistance}`),
  getById: (id) => api.get(`/masjids/${id}`),
  create: (data) => api.post('/masjids', data),
  update: (id, data) => api.put(`/masjids/${id}`, data),
  delete: (id) => api.delete(`/masjids/${id}`)
};

export default api;
