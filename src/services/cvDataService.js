import apiClient from '../api/axios';

// Kumpulan fungsi untuk mengambil dan memperbarui data CV
const CvDataService = {
  // Mengambil semua data untuk halaman CV publik & dashboard
  getAllData() {
    return apiClient.get('/cv-data');
  },

  // Memperbarui setiap bagian
  updateAbout(data) {
    return apiClient.put('/about', data);
  },
  updateExperiences(data) {
    return apiClient.put('/experiences', data);
  },
  updateEducations(data) {
    return apiClient.put('/educations', data);
  },
  updateSkills(data) {
    return apiClient.put('/skills', data);
  },
  updateContacts(data) {
    return apiClient.put('/contacts', data);
  }
};

export default CvDataService;