import apiClient from '../api/axios';

const CvDataService = {
  getAllData() {
    return apiClient.get('/cv-data');
  },

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