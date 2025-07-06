import apiClient from '../api/axios';

const AuthService = {
  login(credentials) {
    
    return apiClient.post('/login', credentials);
  },

  logout() {
    localStorage.removeItem('user-token');
  }
};

export default AuthService;