<template>
  <section id="profil">
    <div class="row align-items-center">
      <div class="col-md-8 text-center text-md-start">
        <h1 class="display-3 fw-bold">
          Halo, saya <span class="text-primary">{{ profileName }}</span>
        </h1>
        <p class="lead text-muted">
          <span id="typed-text"></span>
        </p>
      </div>
      <div class="col-md-4 text-center mt-4 mt-md-0">
        <img v-if="profileImageUrl" :src="profileImageUrl" class="profile-image img-fluid rounded-circle shadow-lg" alt="Foto Profil">
        <div v-else class="profile-placeholder rounded-circle shadow-lg">
          <i class="fas fa-user fa-4x"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const profileName = ref('Memuat...');
const profileImageUrl = ref(null);

const fetchHeroData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/cv-data');
    if (response.data && response.data.hero) {
      profileName.value = response.data.hero.name || 'Nama Tidak Ditemukan';
      profileImageUrl.value = response.data.hero.imageUrl || null;
    }
  } catch (error) {
    console.error('Gagal mengambil data hero:', error);
  }
};

onMounted(() => {
  fetchHeroData();

  if (typeof Typed !== 'undefined') {
    const options = {
      strings: ["Seorang Mahasiswa Informatika.", "Dengan minat pada Cybersecurity.", "Dan juga Internet of Things (IOT)."],
      typeSpeed: 50, backSpeed: 30, backDelay: 1500, loop: true, showCursor: true, cursorChar: '_',
    };
    new Typed('#typed-text', options);
  }
});
</script>

<style scoped>
.profile-image, .profile-placeholder {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border: 5px solid var(--bs-primary);
}
.profile-placeholder {
  border-color: var(--bs-secondary);
  background-color: #282a36;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6272a4;
}
</style>