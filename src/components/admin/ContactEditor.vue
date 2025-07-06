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
import CvDataService from '../../services/cvDataService';

const contacts = ref({ linkedin_url: '', github_url: '' });

onMounted(async () => {
  try {
    const response = await CvDataService.getAllData();
    contacts.value = response.data.contacts;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
});

const saveContact = async () => {
  if (!confirm('Anda yakin ingin menyimpan perubahan?')) return;
  try {
    await CvDataService.updateContacts(contacts.value);
    alert('Data berhasil disimpan!');
  } catch (error) {
    alert('Gagal menyimpan data.');
    console.error(error);
  }
};
</script>