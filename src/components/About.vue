<template>
  <section id="tentang">
    <div class="text-center">
      <h2 class="fw-bold">Tentang Saya</h2>
      <hr class="w-25 mx-auto border-primary border-2">
    </div>
    <div class="row mt-4">
      <div class="col-md-8 mx-auto text-center">
        <p class="fs-5 text-muted">
          {{ aboutContent || 'Memuat data...' }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const aboutContent = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5173/api/cv-data');
    aboutContent.value = response.data.about.content;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
});
</script>