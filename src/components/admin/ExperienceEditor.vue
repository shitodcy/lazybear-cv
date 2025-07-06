<template>
  <div class="row justify-content-center">
    <div class="col-lg-10">
      <div class="card">
          <div class="card-header">
              <h3 class="card-title">Edit Pengalaman</h3>
          </div>
          <div class="card-body">
              <div v-for="(exp, index) in experiences" :key="index" class="mb-4 p-3 border rounded">
                  <div class="form-group">
                      <label>Judul</label>
                      <input type="text" class="form-control" v-model="exp.title">
                  </div>
                  <div class="form-group">
                      <label>Sub Judul (Perusahaan/Platform)</label>
                      <input type="text" class="form-control" v-model="exp.subtitle">
                  </div>
                  <div class="form-group">
                      <label>Deskripsi</label>
                      <textarea class="form-control" rows="3" v-model="exp.description"></textarea>
                  </div>
                  <button class="btn btn-sm btn-danger" @click="removeExperience(index)">Hapus</button>
              </div>
              <button class="btn btn-success mt-3" @click="addExperience">Tambah Pengalaman</button>
          </div>
          <div class="card-footer">
              <button class="btn btn-primary" @click="saveExperiences">Simpan Semua Perubahan</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CvDataService from '../../services/cvDataService';

const experiences = ref([]);

onMounted(async () => {
  const response = await CvDataService.getAllData();
  experiences.value = response.data.experiences;
});

const addExperience = () => {
    experiences.value.push({ title: '', subtitle: '', description: '' });
};

const removeExperience = (index) => {
    if (confirm('Anda yakin ingin menghapus pengalaman ini?')) {
        experiences.value.splice(index, 1);
    }
};

const saveExperiences = async () => {
    if (!confirm('Anda yakin ingin menyimpan semua perubahan pengalaman?')) return;
    try {
        await CvDataService.updateExperiences(experiences.value);
        alert('Data berhasil disimpan!');
    } catch (error) {
        alert('Gagal menyimpan data.');
        console.error(error);
    }
};
</script>