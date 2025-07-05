<template>
  <section id="skill" class="bg-light rounded-3 p-5">
    <div class="text-center mb-5">
      <h2 class="fw-bold">Keahlian</h2>
      <hr class="w-25 mx-auto border-primary border-2">
    </div>
    <div v-if="isLoading" class="text-center">
        <p>Memuat data keahlian...</p>
    </div>
    <div v-else class="row text-center">
      <div class="col-md-6 mb-4">
        <h5 class="fw-bold">Desain</h5>
        <span v-for="skill in designSkills" :key="skill.id" class="badge rounded-pill bg-primary p-2 px-3 m-1">
          {{ skill.name }}
        </span>
        <p v-if="designSkills.length === 0" class="text-muted mt-2">Tidak ada keahlian di kategori ini.</p>
      </div>
      <div class="col-md-6 mb-4">
        <h5 class="fw-bold">Lainnya</h5>
        <span v-for="skill in otherSkills" :key="skill.id" class="badge rounded-pill bg-secondary p-2 px-3 m-1">
          {{ skill.name }}
        </span>
         <p v-if="otherSkills.length === 0" class="text-muted mt-2">Tidak ada keahlian di kategori ini.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// State untuk menyimpan SEMUA skills dari API
const allSkills = ref([]);
const isLoading = ref(true);

// Ambil data dari API
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5173/api/cv-data');
    if (response.data && Array.isArray(response.data.skills)) {
      allSkills.value = response.data.skills;
    }
  } catch (error) {
    console.error('Gagal mengambil data keahlian:', error);
  } finally {
    isLoading.value = false;
  }
});

// Computed property untuk memfilter skills dengan kategori 'Desain'
const designSkills = computed(() => {
  return allSkills.value.filter(skill => skill.category === 'Desain');
});

// Computed property untuk memfilter skills dengan kategori 'Lainnya'
const otherSkills = computed(() => {
  return allSkills.value.filter(skill => skill.category === 'Lainnya');
});
</script>