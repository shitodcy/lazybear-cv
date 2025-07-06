<template>
  <section id="tentang-saya">
    <div class="text-center">
      <h2 class="fw-bold" data-aos="fade-down">About</h2>
      <hr class="w-25 mx-auto border-primary border-2" data-aos="fade-up">
    </div>
    <div class="row mt-4" data-aos="fade-up" data-aos-delay="200">
      <div class="col-md-8 mx-auto text-center">
        <p class="fs-5 text-muted">
          {{ aboutContent || 'Memuat data About...' }}
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

<style scoped>
.fs-5.text-muted {
  line-height: 1.8;
}
</style>