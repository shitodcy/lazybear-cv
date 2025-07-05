<template>
  <section id="pengalaman" class="bg-light rounded-3 p-5">
    <div class="text-center mb-5">
      <h2 class="fw-bold">Pengalaman</h2>
      <hr class="w-25 mx-auto border-primary border-2">
    </div>
    <div class="row g-4">
      <div v-if="isLoading" class="text-center">
        <p>Memuat data pengalaman...</p>
      </div>
      <div v-else class="col-md-12" v-for="exp in experiences" :key="exp.id">
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
      <div v-if="!isLoading && experiences.length === 0" class="text-center">
        <p>Belum ada data pengalaman untuk ditampilkan.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// State untuk menyimpan data pengalaman
const experiences = ref([]);
// State untuk status loading
const isLoading = ref(true);

// Fungsi untuk mengambil data dari API saat komponen dimuat
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5173/api/cv-data');
    // Pastikan respons memiliki properti experiences dan merupakan array
    if (response.data && Array.isArray(response.data.experiences)) {
      experiences.value = response.data.experiences;
    }
  } catch (error) {
    console.error('Gagal mengambil data pengalaman:', error);
    // Anda bisa menambahkan penanganan error untuk ditampilkan di UI
  } finally {
    // Set loading ke false setelah selesai (baik berhasil maupun gagal)
    isLoading.value = false;
  }
});
</script>