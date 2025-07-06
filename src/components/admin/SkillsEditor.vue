<template>
  <div class="row justify-content-center">
    <div class="col-lg-10">
      <div class="card">
          <div class="card-header">
              <h3 class="card-title">Edit Keahlian</h3>
          </div>
          <div class="card-body">
              <div v-for="(skill, index) in skills" :key="index" class="row align-items-center mb-2">
                  <div class="col-5">
                      <input type="text" class="form-control" placeholder="Nama Keahlian" v-model="skill.name">
                  </div>
                  <div class="col-5">
                      <select class="form-select" v-model="skill.category">
                          <option value="Desain">Desain</option>
                          <option value="Lainnya">Lainnya</option>
                      </select>
                  </div>
                  <div class="col-2">
                      <button class="btn btn-sm btn-danger" @click="removeSkill(index)">Hapus</button>
                  </div>
              </div>
              <button class="btn btn-success mt-3" @click="addSkill">Tambah Keahlian</button>
          </div>
          <div class="card-footer">
              <button class="btn btn-primary" @click="saveSkills">Simpan Semua Perubahan</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CvDataService from '../../services/cvDataService';

const skills = ref([]);

onMounted(async () => {
  const response = await CvDataService.getAllData();
  skills.value = response.data.skills;
});

const addSkill = () => {
    skills.value.push({ name: '', category: 'Lainnya' });
};

const removeSkill = (index) => {
    if (confirm('Anda yakin ingin menghapus keahlian ini?')) {
        skills.value.splice(index, 1);
    }
};

const saveSkills = async () => {
    if (!confirm('Anda yakin ingin menyimpan semua perubahan keahlian?')) return;
    try {
        await CvDataService.updateSkills(skills.value);
        alert('Data berhasil disimpan!');
    } catch (error) {
        alert('Gagal menyimpan data.');
        console.error(error);
    }
};
</script>