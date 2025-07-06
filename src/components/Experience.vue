<template>
  <section id="pengalaman" class="bg-light rounded-3 p-5">
    <div class="text-center mb-5" data-aos="fade-down">
      <h2 class="fw-bold">Pengalaman</h2>
      <hr class="w-25 mx-auto border-primary border-2">
    </div>
    <div class="row g-4">
      <div v-if="isLoading" class="text-center">
        <p>Memuat data pengalaman...</p>
      </div>
      <div v-else class="col-md-12" v-for="(exp, index) in experiences" :key="exp.id" data-aos="fade-up" :data-aos-delay="100 * (index + 1)">
        <div class="card h-100 border-secondary">
          <div class="card-body">
            <h5 class="card-title fw-bold text-primary">{{ exp.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ exp.subtitle }}</h6>
            <p class="card-text">
              {{ exp.description }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="!isLoading && experiences.length === 0" class="text-center" data-aos="fade-up">
        <p>Belum ada data pengalaman untuk ditampilkan.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Definisikan URL absolut ke backend Anda
const backendUrl = 'http://localhost:3000';

const experiences = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    // === PERUBAHAN UTAMA: Panggil API backend secara langsung ===
    // Ditambahkan parameter unik untuk mencegah masalah cache browser
    const response = await axios.get(`${backendUrl}/api/cv-data?timestamp=${new Date().getTime()}`);
    
    if (response.data && Array.isArray(response.data.experiences)) {
      experiences.value = response.data.experiences;
    }
  } catch (error) {
    console.error('Gagal mengambil data pengalaman:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Kartu akan menggunakan efek hover global dari main.scss */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
</style>