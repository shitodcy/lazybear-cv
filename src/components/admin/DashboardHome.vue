<template>
  <div>
    <h3 class="mb-4">Dashboard</h3>
    <div class="row">
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="stat-card bg-primary text-white">
          <div class="stat-card-body">
            <h3>{{ experiencesCount }}</h3>
            <p>Total Pengalaman</p>
          </div>
          <div class="stat-card-icon">
            <i class="fas fa-briefcase"></i>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="stat-card bg-info text-dark">
          <div class="stat-card-body">
            <h3>{{ educationsCount }}</h3>
            <p>Riwayat Pendidikan</p>
          </div>
          <div class="stat-card-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="stat-card bg-warning text-dark">
          <div class="stat-card-body">
            <h3>{{ skillsCount }}</h3>
            <p>Total Keahlian</p>
          </div>
          <div class="stat-card-icon">
            <i class="fas fa-cogs"></i>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="stat-card bg-success text-dark">
          <div class="stat-card-body">
            <h3>Online</h3>
            <p>Status Server</p>
          </div>
          <div class="stat-card-icon">
            <i class="fas fa-server"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CvDataService from '../../services/cvDataService';

const experiencesCount = ref(0);
const educationsCount = ref(0);
const skillsCount = ref(0);

onMounted(async () => {
  try {
    // Panggil fungsi getAllData dari service
    const response = await CvDataService.getAllData();
    experiencesCount.value = response.data.experiences.length;
    educationsCount.value = response.data.educations.length;
    skillsCount.value = response.data.skills.length;
  } catch (error) {
    console.error('Gagal mengambil data untuk dashboard:', error);
  }
});
</script>

<style scoped>
.stat-card {
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  border: 1px solid var(--bs-border-color);
}
.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.stat-card-body h3 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
}
.stat-card-body p {
  margin: 0;
  opacity: 0.9;
}
.stat-card-icon {
  font-size: 3.5rem;
  opacity: 0.3;
}
</style>