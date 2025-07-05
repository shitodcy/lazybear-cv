<template>
  <section id="pendidikan">
    <div class="text-center mb-5">
      <h2 class="fw-bold">Pendidikan</h2>
      <hr class="w-25 mx-auto border-primary border-2">
    </div>
    <div class="row g-4">
      <div v-if="isLoading" class="text-center">
        <p>Memuat data pendidikan...</p>
      </div>
      <div v-else class="col-md-6" v-for="edu in educations" :key="edu.id">
        <div class="p-4 rounded-3 bg-light h-100">
          <h5 class="fw-bold">{{ edu.institution }}</h5>
          <p class="text-primary mb-1">{{ edu.major }}</p>
          <p class="text-muted">{{ edu.period }}</p>
        </div>
      </div>
       <div v-if="!isLoading && educations.length === 0" class="text-center col-12">
        <p>Belum ada data pendidikan untuk ditampilkan.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const educations = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5173/api/cv-data');
    if (response.data && Array.isArray(response.data.educations)) {
      educations.value = response.data.educations;
    }
  } catch (error) {
    console.error('Gagal mengambil data pendidikan:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>