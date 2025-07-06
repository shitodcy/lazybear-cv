<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Edit Profil (Metode Baru)</h3>
        </div>
        <form @submit.prevent="saveProfile">
          <div class="card-body">
            <div class="text-center mb-4">
              <img v-if="previewImageUrl" :src="previewImageUrl" class="profile-preview rounded-circle shadow-lg" alt="Preview">
              <div v-else class="profile-placeholder rounded-circle shadow-lg">
                <i class="fas fa-user fa-3x"></i>
              </div>
            </div>
            <div class="form-group mb-3">
              <label for="profileName" class="form-label">Nama Lengkap</label>
              <input type="text" id="profileName" class="form-control" v-model="profile.name">
            </div>
            <div class="form-group">
              <label for="profileImage" class="form-label">Ganti Foto Profil</label>
              <input type="file" id="profileImage" class="form-control" @change="handleImageUpload" accept="image/png, image/jpeg">
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../../api/axios.js';

const profile = ref({ name: '' });
const previewImageUrl = ref(null);
const newImageAsBase64 = ref(null);

const fetchProfileData = async () => {
  try {
    const response = await apiClient.get('/cv-data');
    if (response.data && response.data.hero) {
      profile.value.name = response.data.hero.name || '';
      previewImageUrl.value = response.data.hero.imageUrl || null;
    }
  } catch (error) {
    console.error('Gagal mengambil data profil:', error);
  }
};

onMounted(fetchProfileData);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    previewImageUrl.value = reader.result;
    newImageAsBase64.value = reader.result;
  };
};

const saveProfile = async () => {
  if (!confirm('Anda yakin ingin menyimpan perubahan?')) return;
  const payload = {
    name: profile.value.name,
  };
  if (newImageAsBase64.value) {
    payload.imageUrl = newImageAsBase64.value;
  }
  try {
    await apiClient.put('/profile', payload);
    alert('Profil berhasil diperbarui!');
    location.reload(); 
  } catch (error) {
    console.error('Gagal menyimpan profil:', error);
    alert('Gagal menyimpan profil. Lihat konsol untuk detail.');
  }
};
</script>

<style scoped>
.profile-preview, .profile-placeholder {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 4px solid var(--bs-primary);
}
.profile-placeholder {
  border-color: var(--bs-secondary);
  background-color: #282a36;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6272a4;
  margin: 0 auto;
}
</style>