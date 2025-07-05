<template>
  <footer id="kontak" class="bg-light mt-5 py-5">
    <div class="container text-center">
      <h3 class="fw-bold">Hubungi Saya</h3>
      <div class="d-flex justify-content-center fs-2 my-4">
        <a :href="contacts.linkedin_url" target="_blank" class="text-body-secondary mx-3" v-if="contacts.linkedin_url">
          <i class="bi bi-linkedin"></i>
        </a>
        <a :href="contacts.github_url" target="_blank" class="text-body-secondary mx-3" v-if="contacts.github_url">
          <i class="bi bi-github"></i>
        </a>
      </div>
      <p class="text-muted mt-4">
        Dibuat Oleh Shitodcy.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const contacts = ref({});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5173/api/cv-data');
    if (response.data && response.data.contacts) {
      contacts.value = response.data.contacts;
    }
  } catch (error) {
    console.error('Gagal mengambil data kontak:', error);
  }
});
</script>