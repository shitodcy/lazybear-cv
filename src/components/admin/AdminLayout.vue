<template>
  <div>
    <button class="mobile-menu-toggle" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>

    <div class="dashboard-layout" :class="{ 'sidebar-open': !isSidebarHidden }">
      <aside class="dashboard-sidebar">
        <div class="sidebar-header">
          <router-link to="/admin" class="sidebar-title">CV DASHBOARD</router-link>
        </div>

        <ul class="sidebar-menu">
          <li>
            <router-link to="/admin/dashboard" class="sidebar-link" @click="hideSidebarOnMobile">
              <i class="fas fa-home"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li class="mt-3">
            <small class="text-muted ps-3">MANAJEMEN KONTEN</small>
          </li>
          <li>
            <router-link to="/admin/about" class="sidebar-link" @click="hideSidebarOnMobile">
              <i class="fas fa-user"></i>
              <span>Tentang Saya</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/experience" class="sidebar-link" @click="hideSidebarOnMobile">
              <i class="fas fa-briefcase"></i>
              <span>Pengalaman</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/education" class="sidebar-link" @click="hideSidebarOnMobile">
              <i class="fas fa-graduation-cap"></i>
              <span>Pendidikan</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/skills" class="sidebar-link" @click="hideSidebarOnMobile">
              <i class="fas fa-cogs"></i>
              <span>Keahlian</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/contact" class="sidebar-link" @click="hideSidebarOnMobile">
              <i class="fas fa-address-book"></i>
              <span>Kontak</span>
            </router-link>
          </li>
          <li class="mt-auto"> <a href="#" @click.prevent="logout" class="sidebar-link">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </a>
          </li>
        </ul>
      </aside>

      <main class="dashboard-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSidebarHidden = ref(true);

const toggleSidebar = () => {
  isSidebarHidden.value = !isSidebarHidden.value;
};

// Fungsi untuk menutup sidebar secara otomatis setelah link di-klik pada mode mobile
const hideSidebarOnMobile = () => {
  if (window.innerWidth <= 992) {
    isSidebarHidden.value = true;
  }
};

// Fungsi Logout
const logout = () => {
  if (confirm('Anda yakin ingin logout?')) {
    // Menghapus flag login sederhana dari localStorage
    localStorage.removeItem('isLoggedIn');
    // Arahkan kembali ke halaman login
    router.push('/login');
  }
};

// Logika untuk menampilkan/menyembunyikan sidebar berdasarkan ukuran layar awal
onMounted(() => {
  if (window.innerWidth > 992) {
    isSidebarHidden.value = false;
  }
});
</script>