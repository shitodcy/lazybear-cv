import { createRouter, createWebHistory } from 'vue-router';

// Impor komponen-komponen utama
import MainApp from '../MainApp.vue';
import AdminLayout from '../components/admin/AdminLayout.vue';
import Login from '../views/Login.vue';

// Impor komponen halaman dasbor
import DashboardHome from '../components/admin/DashboardHome.vue';
import AboutEditor from '../components/admin/AboutEditor.vue';
import ExperienceEditor from '../components/admin/ExperienceEditor.vue';
import EducationEditor from '../components/admin/EducationEditor.vue';
import SkillsEditor from '../components/admin/SkillsEditor.vue';
import ContactEditor from '../components/admin/ContactEditor.vue';
// Impor komponen baru
import ProfileEditor from '../components/admin/ProfileEditor.vue';

const routes = [
  { 
    path: '/', 
    name: 'CV', 
    component: MainApp 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: Login
  },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    beforeEnter: (to, from, next) => {
      next(); 
    },
    children: [
      { path: 'dashboard', component: DashboardHome },
      { path: 'profile', component: ProfileEditor }, // <-- RUTE BARU DITAMBAHKAN DI SINI
      { path: 'about', component: AboutEditor },
      { path: 'experience', component: ExperienceEditor },
      { path: 'education', component: EducationEditor },
      { path: 'skills', component: SkillsEditor },
      { path: 'contact', component: ContactEditor },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;