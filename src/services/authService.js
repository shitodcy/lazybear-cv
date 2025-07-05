import apiClient from '../api/axios';

// Kumpulan fungsi yang berhubungan dengan login dan logout
const AuthService = {
  login(credentials) {
    // credentials adalah objek { username: '...', password: '...' }
    return apiClient.post('/login', credentials);
  },

  logout() {
    // Hapus token dari penyimpanan lokal
    localStorage.removeItem('user-token');
  }
};

export default AuthService;