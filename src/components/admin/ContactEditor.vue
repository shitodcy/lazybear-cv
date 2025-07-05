<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Edit Link Kontak</h3>
        </div>
        <form @submit.prevent="saveContact">
          <div class="card-body">
            <div class="form-group">
                <label>URL LinkedIn</label>
                <input type="text" class="form-control" v-model="contacts.linkedin_url">
            </div>
            <div class="form-group">
                <label>URL GitHub</label>
                <input type="text" class="form-control" v-model="contacts.github_url">
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
import axios from 'axios';

const contacts = ref({ linkedin_url: '', github_url: '' });

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5173/api/cv-data');
    contacts.value = response.data.contacts;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
});

const saveContact = async () => {
  if (!confirm('Anda yakin ingin menyimpan perubahan?')) return;
  try {
    await axios.put('http://localhost:5173/api/contacts', contacts.value);
    alert('Data berhasil disimpan!');
  } catch (error) {
    alert('Gagal menyimpan data.');
  }
};
</script>