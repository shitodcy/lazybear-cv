<template>
  <div class="login-page-wrapper">
    <div class="login-box">
      <div class="login-logo text-center mb-4">
        <i class="fas fa-user-lock fa-3x text-primary"></i>
        <h2 class="mt-3 fw-bold">ADMIN PANEL</h2>
        <p class="text-muted">Silakan login untuk melanjutkan</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="username" placeholder="Username" v-model="username" required>
          <label for="username">Username</label>
        </div>
        <div class="form-floating mb-4">
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" required>
          <label for="password">Password</label>
        </div>
        <div v-if="errorMessage" class="alert alert-danger py-2">{{ errorMessage }}</div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary btn-lg py-3" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <span v-else>LOGIN</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../api/axios';
import { useRouter } from 'vue-router';

const username = ref('finaladmin');
const password = ref('finalpassword123');
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await apiClient.post('/login', {
      username: username.value,
      password: password.value,
    });
    // Logika ini sekarang menangani token JWT dengan benar
    if (response.data.success) {
      localStorage.setItem('user-token', response.data.token);
      router.push('/admin');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan saat login.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page-wrapper { display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #212529; }
.login-box { width: 100%; max-width: 420px; padding: 3rem; background-color: #282a36; border-radius: 15px; border: 1px solid #44475a; }
.form-control { background-color: #44475a; border-color: #6272a4; color: #f8f8f2; }
.form-control:focus { background-color: #44475a; border-color: #bd93f9; box-shadow: none; color: #f8f8f2; }
.form-floating > label { color: #6272a4; }
.form-floating > .form-control:focus ~ label { color: #bd93f9; }
</style>