<template>
  <section id="pengalaman" class="dracula-section py-5">
    <div class="container">
      <div class="text-center mb-5">
      <h2 class="fw-bold" data-aos="fade-down">Experience</h2>
      <hr class="w-25 mx-auto border-primary border-2" data-aos="fade-up">
    </div>

      <div v-if="isLoading" class="text-center py-5" data-aos="fade-up">
        <div class="loading-spinner mx-auto mb-3"></div>
        <p class="loading-text">Memuat data Experience...</p>
      </div>

      <div v-else class="row g-4 mb-5">
        <div 
          v-for="(exp, index) in experiences" 
          :key="exp.id"
          class="col-lg-4 col-md-6"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)">
          <div 
            class="card experience-card h-100"
            :class="{ 
              'expanded': selectedCard === exp.id, 
              'hovered': hoveredCard === exp.id,
              [`gradient-${(index % 6) + 1}`]: true
            }"
            @mouseenter="hoveredCard = exp.id"
            @mouseleave="hoveredCard = null"
            @click="toggleCard(exp.id)">
            <div class="card-header border-0 bg-transparent">
              <div class="d-flex justify-content-between align-items-start">
                <div class="d-flex align-items-center">
                  <div class="icon-container me-3" :class="`icon-gradient-${(index % 6) + 1}`">
                    <i :class="getIconClass(exp.title)" class="card-icon"></i>
                  </div>
                  <span class="badge type-badge" :class="getTypeBadgeClass(exp.title)">
                    {{ getExperienceType(exp.title) }}
                  </span>
                </div>
                <div class="expand-arrow" :class="{ 'rotated': selectedCard === exp.id }">
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>

            <div class="card-body pt-0">
              <h5 class="card-title fw-bold mb-3">{{ exp.title }}</h5>
              
              <div class="card-meta mb-3">
                <div class="d-flex flex-wrap gap-3">
                  <small class="text-muted d-flex align-items-center">
                    <i class="fas fa-map-marker-alt me-1"></i>
                    {{ exp.subtitle }}
                  </small>
                  <small class="text-muted d-flex align-items-center">
                    <i class="fas fa-calendar me-1"></i>
                    {{ getYear(exp.title) }}
                  </small>
                </div>
              </div>

              <p class="card-text">{{ exp.description }}</p>

              <transition name="skills-expand">
                <div v-if="selectedCard === exp.id || hoveredCard === exp.id" class="skills-container">
                  <hr class="skills-divider">
                  <div class="d-flex flex-wrap gap-2">
                    <span 
                      v-for="(skill, skillIndex) in getSkills(exp.title)" 
                      :key="skill"
                      class="badge skill-tag"
                      :style="{ animationDelay: `${skillIndex * 0.1}s` }"
>
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </transition>
            </div>

            <div class="hover-overlay"></div>
          </div>
        </div>

        <div v-if="experiences.length === 0" class="col-12 text-center py-5" data-aos="fade-up">
          <i class="fas fa-folder-open empty-icon mb-3"></i>
          <p class="text-muted">Belum ada data pengalaman untuk ditampilkan.</p>
        </div>
      </div>

      </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Backend URL
const backendUrl = 'http://localhost:3000';

// Reactive data
const experiences = ref([]);
const isLoading = ref(true);
const selectedCard = ref(null);
const hoveredCard = ref(null);

// Computed
const stats = computed(() => [
  { label: 'Kompetisi', value: '6+', icon: 'fas fa-trophy' },
  { label: 'Tahun Pengalaman', value: '3+', icon: 'fas fa-calendar' },
  { label: 'Keahlian', value: '15+', icon: 'fas fa-bolt' },
  { label: 'Mentoring', value: '1', icon: 'fas fa-users' }
]);

// Methods
const toggleCard = (id) => {
  selectedCard.value = selectedCard.value === id ? null : id;
};

const getIconClass = (title) => {
  if (title.includes('IT Support')) return 'fas fa-server';
  if (title.includes('CTF')) return 'fas fa-shield-alt';
  if (title.includes('SYSADMIN')) return 'fas fa-network-wired';
  if (title.includes('CYBER SECURITY')) return 'fas fa-shield-alt';
  if (title.includes('Mentor')) return 'fas fa-users';
  if (title.includes('NETCOMP')) return 'fas fa-network-wired';
  if (title.includes('NETWORKING')) return 'fas fa-bolt';
  return 'fas fa-code';
};

const getExperienceType = (title) => {
  if (title.includes('PKL')) return 'Internship';
  if (title.includes('Mentor')) return 'Mentorship';
  return 'Competition';
};

const getTypeBadgeClass = (title) => {
  if (title.includes('PKL')) return 'badge-internship';
  if (title.includes('Mentor')) return 'badge-mentorship';
  return 'badge-competition';
};

const getYear = (title) => {
  if (title.includes('2021')) return '2021';
  if (title.includes('2022')) return '2022';
  if (title.includes('2023')) return '2023';
  if (title.includes('2024')) return '2024';
  return '2023';
};

const getSkills = (title) => {
  const skillsMap = {
    'IT Support': ['Hardware Troubleshooting', 'Software Support', 'Network Maintenance'],
    'CTF': ['OSINT', 'Web Hacking', 'Packet Analysis', 'Vulnerability Assessment'],
    'SYSADMIN': ['Server Configuration', 'Network Analysis', 'System Administration'],
    'CYBER SECURITY': ['Penetration Testing', 'Defense Strategies', 'Incident Response'],
    'Mentor': ['Teaching', 'Cybersecurity Training', 'Student Mentoring'],
    'NETCOMP': ['Network Troubleshooting', 'Case Study Analysis', 'Problem Solving'],
    'NETWORKING': ['Advanced Networking', 'Infrastructure Design', 'Performance Optimization']
  };
  
  for (const [key, skills] of Object.entries(skillsMap)) {
    if (title.includes(key)) return skills;
  }
  return ['Technical Skills', 'Problem Solving', 'Team Work'];
};

// Lifecycle
onMounted(async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/cv-data?timestamp=${new Date().getTime()}`);
    
    if (response.data && Array.isArray(response.data.experiences)) {
      experiences.value = response.data.experiences;
    }
  } catch (error) {
    console.error('Gagal mengambil data pengalaman:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>

:root {
  --dracula-bg: #6272a4;
  --dracula-current-line: #6272a4;
  --dracula-foreground: #f8f8f2;
  --dracula-comment: #6272a4;
  --dracula-cyan: #8be9fd;
  --dracula-green: #50fa7b;
  --dracula-orange: #ffb86c;
  --dracula-pink: #ff79c6;
  --dracula-purple: #bd93f9;
  --dracula-red: #ff5555;
  --dracula-yellow: #f1fa8c;
}

.dracula-section {
  background: var(--dracula-bg) !important;
  color: var(--dracula-foreground) !important;
  min-height: 100vh;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--dracula-pink), var(--dracula-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--dracula-comment) !important;
  max-width: 600px;
  margin: 0 auto;
}

 
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--dracula-current-line);
  border-top: 3px solid var(--dracula-pink);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--dracula-comment);
  font-size: 1.1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.experience-card {
  background: #44475A !important;
  border: 1px solid rgba(98, 114, 164, 0.3) !important;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.experience-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgb(255, 255, 255) !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
}

.experience-card.expanded {
  border-color: rgba(189, 147, 249, 0.5) !important;
  box-shadow: 0 0 0 2px rgba(189, 147, 249, 0.3) !important;
}

.gradient-1::before { background: linear-gradient(135deg, var(--dracula-purple), var(--dracula-pink)); }
.gradient-2::before { background: linear-gradient(135deg, var(--dracula-green), var(--dracula-cyan)); }
.gradient-3::before { background: linear-gradient(135deg, var(--dracula-cyan), var(--dracula-purple)); }
.gradient-4::before { background: linear-gradient(135deg, var(--dracula-red), var(--dracula-orange)); }
.gradient-5::before { background: linear-gradient(135deg, var(--dracula-yellow), var(--dracula-red)); }
.gradient-6::before { background: linear-gradient(135deg, var(--dracula-orange), var(--dracula-purple)); }

.experience-card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.05;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.experience-card:hover::before {
  opacity: 0.1;
}

.card-header {
  position: relative;
  z-index: 2;
}

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.experience-card:hover .icon-container {
  transform: rotate(360deg);
}

.icon-gradient-1 { background: linear-gradient(135deg, var(--dracula-purple), var(--dracula-pink)); }
.icon-gradient-2 { background: linear-gradient(135deg, var(--dracula-green), var(--dracula-cyan)); }
.icon-gradient-3 { background: linear-gradient(135deg, var(--dracula-cyan), var(--dracula-purple)); }
.icon-gradient-4 { background: linear-gradient(135deg, var(--dracula-red), var(--dracula-orange)); }
.icon-gradient-5 { background: linear-gradient(135deg, var(--dracula-yellow), var(--dracula-red)); }
.icon-gradient-6 { background: linear-gradient(135deg, var(--dracula-orange), var(--dracula-purple)); }

.card-icon {
  color: white;
  font-size: 1.25rem;
}

.type-badge {
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  border: 1px solid;
}

.badge-internship {
  background-color: rgba(189, 147, 249, 0.2) !important;
  color: var(--dracula-purple) !important;
  border-color: rgba(189, 147, 249, 0.3) !important;
}

.badge-competition {
  background-color: rgba(80, 250, 123, 0.2) !important;
  color: var(--dracula-green) !important;
  border-color: rgba(80, 250, 123, 0.3) !important;
}

.badge-mentorship {
  background-color: rgba(241, 250, 140, 0.2) !important;
  color: var(--dracula-yellow) !important;
  border-color: rgba(241, 250, 140, 0.3) !important;
}

.expand-arrow {
  color: var(--dracula-comment);
  transition: transform 0.3s ease;
}

.expand-arrow.rotated {
  transform: rotate(90deg);
}

.card-body {
  position: relative;
  z-index: 2;
}

.card-title {
  color: var(--dracula-foreground) !important;
  transition: color 0.3s ease;
}

.experience-card:hover .card-title {
  color: var(--dracula-pink) !important;
}

.card-meta .text-muted {
  color: var(--dracula-comment) !important;
}

.card-text {
  color: rgba(248, 248, 242, 0.8) !important;
  line-height: 1.6;
}

.skills-divider {
  border-color: rgba(98, 114, 164, 0.2) !important;
  margin: 0.75rem 0;
}

.skill-tag {
  background-color: var(--dracula-bg) !important;
  color: var(--dracula-green) !important;
  border: 1px solid rgba(80, 250, 123, 0.3) !important;
  font-size: 0.75rem !important;
  animation: skillFadeIn 0.5s ease forwards;
  opacity: 0;
  transform: scale(0.8);
}

@keyframes skillFadeIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.skills-expand-enter-active,
.skills-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.skills-expand-enter-from,
.skills-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.skills-expand-enter-to,
.skills-expand-leave-from {
  opacity: 1;
  max-height: 200px;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.experience-card:hover .hover-overlay {
  opacity: 1;
}

.stat-card {
  background: var(--dracula-current-line) !important;
  border: 1px solid rgba(98, 114, 164, 0.3) !important;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

.stat-icon {
  color: var(--dracula-pink);
  font-size: 2rem;
}

.stat-value {
  font-size: 1.5rem;
  color: var(--dracula-foreground) !important;
}

.stat-label {
  color: var(--dracula-comment) !important;
}

.empty-icon {
  font-size: 3rem;
  color: var(--dracula-comment);
  opacity: 0.5;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .card-meta .d-flex {
    flex-direction: column !important;
    gap: 0.5rem !important;
  }
}

@media (max-width: 576px) {
  .icon-container {
    width: 40px;
    height: 40px;
  }
  
  .card-icon {
    font-size: 1rem;
  }
}
</style>