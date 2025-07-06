<template>
  <section id="keahlian" class="skills-section">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-bold" data-aos="fade-down">Keahlian</h2>
        <hr class="w-25 mx-auto border-primary border-2" data-aos="fade-up">
      </div>

      <div v-if="isLoading" class="text-center py-5" data-aos="fade-up">
        <div class="loading-spinner mx-auto mb-3"></div>
        <p class="loading-text">Memuat data keahlian...</p>
      </div>

      <div v-else class="row g-4">
        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
          <div class="skill-category-card">
            <div class="card-header">
              <div class="category-icon icon-skills"><i class="fas fa-brain"></i></div>
              <h3 class="category-title">Skills</h3>
            </div>
            <div class="skills-list">
              <span v-for="(skill, index) in generalSkills" :key="skill.id" class="skill-tag" :style="{ animationDelay: `${index * 50}ms` }">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <div class="skill-category-card">
            <div class="card-header">
              <div class="category-icon icon-language"><i class="fas fa-code"></i></div>
              <h3 class="category-title">Programming Language</h3>
            </div>
            <div class="skills-list logo-list">
              <div v-for="(skill, index) in programmingLanguages"
                   :key="skill.id"
                   class="skill-item-wrapper"
                   :style="{ animationDelay: `${index * 50}ms` }"
                   :title="skill.name">

                <span v-if="skill.name === 'HTML'" class="skill-html-tag">
                  {{ skill.name }}
                </span>

                <div v-else class="skill-logo-box">
                  <img :src="skill.logo" :alt="skill.name" class="skill-logo">
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

       <div v-if="!isLoading && allSkills.length === 0" class="col-12 text-center py-5" data-aos="fade-up">
        <div class="empty-state">
          <i class="fas fa-tools empty-icon mb-3"></i>
          <p class="empty-text">Belum ada data keahlian untuk ditampilkan.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const allSkills = ref([]);
const isLoading = ref(true);

const fallbackSkills = [
  { id: 1, name: 'Linux', category: 'Skills' },
  { id: 2, name: 'Cybersecurity', category: 'Skills' },
  { id: 3, name: 'IOT', category: 'Skills' },
  { id: 4, name: 'Hardware hacking', category: 'Skills' },
  { id: 5, name: 'Networking', category: 'Skills' },
  { id: 6, name: 'Devops', category: 'Skills' },
  { id: 7, name: 'HTML', category: 'Programming Language' },
  { id: 8, name: 'CSS', category: 'Programming Language' },
  { id: 9, name: 'Javascript', category: 'Programming Language' },
  { id: 10, name: 'PHP', category: 'Programming Language' },
  { id: 11, name: 'C++', category: 'Programming Language' },
  { id: 12, name: 'Python', category: 'Programming Language' },
  { id: 13, name: 'C', category: 'Programming Language' },
];

// Fungsi untuk mendapatkan URL logo berwarna dari CDN
const getLogoUrl = (skillName) => {
  const formattedName = skillName.toLowerCase()
    .replace(/\s/g, '')
    .replace('++', 'plusplus')
    .replace('#', 'sharp')
    .replace('html', 'html5') // Menggunakan logo HTML5
    .replace('css', 'css3');  // Menggunakan logo CSS3

  // Hapus kode warna dari URL untuk mendapatkan logo dengan warna asli
  return `https://cdn.simpleicons.org/${formattedName}`;
};

onMounted(() => {
  // Untuk demo, kita langsung gunakan data fallback
  // Dalam aplikasi nyata, Anda bisa mengaktifkan kembali pemanggilan API
  allSkills.value = fallbackSkills;
  isLoading.value = false;
});

const generalSkills = computed(() =>
  allSkills.value.filter(skill => skill.category === 'Skills')
);

const programmingLanguages = computed(() =>
  allSkills.value
    .filter(skill => skill.category === 'Programming Language')
    .map(skill => ({
      ...skill,
      logo: getLogoUrl(skill.name)
    }))
);
</script>

<style scoped>

:root {
  --dracula-bg: #282a36;
  --dracula-current-line: #44475a;
  --dracula-foreground: #f8f8f2;
  --dracula-comment: #6272a4;
  --dracula-cyan: #8be9fd;
  --dracula-green: #50fa7b;
  --dracula-orange: #ffb86c;
  --dracula-pink: #ff79c6;
  --dracula-purple: #bd93f9;
  --dracula-red: #ff5555;
}

.skills-section {
  background-color: var(--dracula-bg);
  color: var(--dracula-foreground);
  padding: 5rem 0;
}

.loading-spinner {
  width: 50px; height: 50px; border: 3px solid var(--dracula-current-line);
  border-top: 3px solid var(--dracula-cyan); border-radius: 50%;
  animation: spin 1s linear infinite;
}
.loading-text, .empty-text { color: var(--dracula-comment); font-size: 1.1rem; }
.empty-icon { font-size: 4rem; color: var(--dracula-comment); opacity: 0.4; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.skill-category-card {
  background-color: #44475A;
  border-radius: 15px;
  padding: 2rem;
  height: 100%;
  border: 1px solid rgba(98, 114, 164, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.skill-category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border-color: var(--dracula-purple);
}

.card-header {
  display: flex; align-items: center; margin-bottom: 1.5rem;
  background-color: transparent; border-bottom: 1px solid rgba(98, 114, 164, 0.2);
  padding-bottom: 1rem;
}

.category-icon {
  width: 50px; height: 50px; border-radius: 12px; display: flex;
  align-items: center; justify-content: center; font-size: 1.5rem;
  margin-right: 1rem; color: #fff;
}
.icon-skills { background: linear-gradient(135deg, var(--dracula-cyan), var(--dracula-green)); }
.icon-language { background: linear-gradient(135deg, var(--dracula-pink), var(--dracula-orange)); }
.category-title { font-size: 1.5rem; font-weight: 600; color: var(--dracula-foreground); margin-bottom: 0; }

.skills-list { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }

.skill-tag {
  background-color: var(--dracula-bg); color: var(--dracula-green);
  border: 1px solid rgba(80, 250, 123, 0.3); padding: 0.5rem 1rem;
  border-radius: 8px; font-weight: 500; cursor: default;
  transition: all 0.2s ease;
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}
.skill-tag:hover {
  transform: scale(1.05); background-color: var(--dracula-green);
  color: var(--dracula-bg); border-color: var(--dracula-green);
}

.logo-list {
  gap: 1rem;
}

.skill-item-wrapper {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  transition: transform 0.2s ease;
}
.skill-item-wrapper:hover {
  transform: scale(1.1);
}

.skill-logo-box {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.skill-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.skill-html-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--dracula-bg);
  border: 1px solid var(--dracula-comment);
  color: var(--dracula-foreground);
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: default;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>