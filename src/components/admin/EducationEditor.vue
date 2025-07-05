<template>
  <div class="row justify-content-center">
    <div class="col-lg-10">
      <div class="card">
          <div class="card-header">
              <h3 class="card-title">Edit Pendidikan</h3>
          </div>
          <div class="card-body">
              <div v-for="(edu, index) in educations" :key="index" class="mb-4 p-3 border rounded">
                  <div class="form-group">
                      <label>Nama Institusi</label>
                      <input type="text" class="form-control" v-model="edu.institution">
                  </div>
                  <div class="form-group">
                      <label>Jurusan</label>
                      <input type="text" class="form-control" v-model="edu.major">
                  </div>
                  <div class="form-group">
                      <label>Periode</label>
                      <input type="text" class="form-control" v-model="edu.period">
                  </div>
                  <button class="btn btn-sm btn-danger" @click="removeEducation(index)">Hapus</button>
              </div>
              <button class="btn btn-success mt-3" @click="addEducation">Tambah Pendidikan</button>
          </div>
          <div class="card-footer">
              <button class="btn btn-primary" @click="saveEducations">Simpan Semua Perubahan</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const educations = ref([]);

onMounted(async () => {
  const response = await axios.get('http://localhost:5173/api/cv-data');
  educations.value = response.data.educations;
});

const addEducation = () => {
    educations.value.push({ institution: '', major: '', period: '' });
};

const removeEducation = (index) => {
    educations.value.splice(index, 1);
};

const saveEducations = async () => {
    if (!confirm('Anda yakin ingin menyimpan semua perubahan pendidikan?')) return;
    try {
        await axios.put('http://localhost:5173/api/educations', educations.value);
        alert('Data berhasil disimpan!');
    } catch (error) {
        alert('Gagal menyimpan data.');
    }
};
</script>