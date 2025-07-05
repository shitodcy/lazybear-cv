<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Edit Konten "Tentang Saya"</h3>
        </div>
        <form @submit.prevent="saveAbout">
          <div class="card-body">
            <div class="form-group">
              <textarea v-model="aboutContent" class="form-control" rows="8" placeholder="Tulis tentang dirimu..."></textarea>
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CvDataService from '../../services/cvDataService'; // <-- Impor service baru

const aboutContent = ref('');

onMounted(async () => {
  try {
    const response = await CvDataService.getAllData();
    aboutContent.value = response.data.about.content;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
});

const saveAbout = async () => {
  if (!confirm('Anda yakin ingin menyimpan perubahan?')) return;
  try {
    // Panggil fungsi update dari service
    await CvDataService.updateAbout({ content: aboutContent.value });
    alert('Data berhasil disimpan!');
  } catch (error) {
    alert('Gagal menyimpan data.');
  }
};
</script>