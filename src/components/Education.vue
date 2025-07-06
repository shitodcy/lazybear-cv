<template>
  <section id="pendidikan" class="dracula-section py-5">
    <div class="container">
      <div class="text-center mb-5">
      <h2 class="fw-bold" data-aos="fade-down">Education</h2>
      <hr class="w-25 mx-auto border-primary border-2" data-aos="fade-up">
    </div>

      <div v-if="isLoading" class="text-center py-5" data-aos="fade-up">
        <div class="loading-spinner mx-auto mb-3"></div>
        <p class="loading-text">Memuat data Education...</p>
      </div>

      <div v-else class="row g-4 mb-5">
        <div 
          v-for="(edu, index) in educations" 
          :key="edu.id"
          class="col-lg-6 col-md-6"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)"
        >
          <div 
            class="card education-card h-100"
            :class="{ 
              'hovered': hoveredCard === edu.id,
              [`card-variant-${(index % 4) + 1}`]: true
            }"
            @mouseenter="hoveredCard = edu.id"
            @mouseleave="hoveredCard = null"
            @click="toggleCard(edu.id)"
          >
            <div class="card-body p-4">
              <div class="d-flex align-items-start mb-4">
                <div class="icon-wrapper me-3" :class="`icon-variant-${(index % 4) + 1}`">
                  <i class="fas fa-graduation-cap education-icon"></i>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <span class="badge education-badge" :class="getEducationBadgeClass(edu.major)">
                      {{ getEducationType(edu.major) }}
                    </span>
                    <div class="expand-indicator" :class="{ 'expanded': selectedCard === edu.id }">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>

              <h5 class="card-title fw-bold mb-3">{{ edu.institution }}</h5>
              
              <div class="major-info mb-3">
                <div class="d-flex align-items-center mb-2">
                  <i class="fas fa-book me-2 text-primary-custom"></i>
                  <span class="major-text">{{ edu.major }}</span>
                </div>
                
                <div class="d-flex align-items-center">
                  <i class="fas fa-calendar-alt me-2 text-secondary-custom"></i>
                  <span class="period-text">{{ edu.period }}</span>
                </div>
              </div>

              <transition name="details-expand">
                <div v-if="selectedCard === edu.id || hoveredCard === edu.id" class="details-section">
                  <div class="details-divider mb-3"></div>
                  <div class="education-details">
                    <div class="detail-item mb-2">
                      <i class="fas fa-map-marker-alt me-2"></i>
                      <span>{{ getLocation(edu.institution) }}</span>
                    </div>
                    <div class="detail-item mb-2">
                      <i class="fas fa-award me-2"></i>
                      <span>{{ getStatus(edu.period) }}</span>
                    </div>
                    <div class="skills-tags mt-3">
                      <span 
                        v-for="(skill, skillIndex) in getEducationSkills(edu.major)" 
                        :key="skill"
                        class="skill-tag me-2 mb-2"
                        :style="{ animationDelay: `${skillIndex * 0.1}s` }"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

            <div class="card-overlay" :class="`overlay-variant-${(index % 4) + 1}`"></div>
            
            <div class="animated-border"></div>
          </div>
        </div>

        <div v-if="educations.length === 0" class="col-12 text-center py-5" data-aos="fade-up">
          <div class="empty-state">
            <i class="fas fa-university empty-icon mb-3"></i>
            <p class="empty-text">Belum ada data pendidikan untuk ditampilkan.</p>
          </div>
        </div>
      </div>

      </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Reactive data
const educations = ref([]);
const isLoading = ref(true);
const hoveredCard = ref(null);
const selectedCard = ref(null);

// Computed properties
const sortedEducations = computed(() => {
  return [...educations.value].sort((a, b) => {
    // Sort by year (newest first)
    const yearA = parseInt(a.period.match(/\d{4}/)?.[0] || '0');
    const yearB = parseInt(b.period.match(/\d{4}/)?.[0] || '0');
    return yearB - yearA;
  });
});

// Methods
const toggleCard = (id) => {
  selectedCard.value = selectedCard.value === id ? null : id;
};

const getEducationType = (major) => {
  if (major.includes('S1') || major.includes('Sarjana')) return 'Sarjana';
  if (major.includes('S2') || major.includes('Magister')) return 'Magister';
  if (major.includes('S3') || major.includes('Doktor')) return 'Doktor';
  if (major.includes('D3') || major.includes('Diploma')) return 'Diploma';
  if (major.includes('SMK') || major.includes('SMA')) return 'Menengah';
  return 'Pendidikan';
};

const getEducationBadgeClass = (major) => {
  const type = getEducationType(major);
  switch (type) {
    case 'Sarjana': return 'badge-sarjana';
    case 'Magister': return 'badge-magister';
    case 'Doktor': return 'badge-doktor';
    case 'Diploma': return 'badge-diploma';
    case 'Menengah': return 'badge-menengah';
    default: return 'badge-default';
  }
};

const getEducationSkills = (major) => {
  const skillsMap = {
    'Teknik Informatika': ['Programming', 'Database', 'Web Development', 'Mobile Development'],
    'Sistem Informasi': ['System Analysis', 'Database Design', 'Project Management', 'Business Process'],
    'Teknik Komputer': ['Hardware', 'Networking', 'Embedded Systems', 'IoT'],
    'Cyber Security': ['Network Security', 'Ethical Hacking', 'Digital Forensics', 'Risk Management'],
    'Data Science': ['Machine Learning', 'Statistics', 'Python', 'Data Visualization'],
    'Rekayasa Perangkat Lunak': ['Software Engineering', 'Testing', 'DevOps', 'Agile'],
    'Multimedia': ['Design', 'Animation', 'Video Editing', 'UI/UX']
  };
  
  for (const [key, skills] of Object.entries(skillsMap)) {
    if (major.includes(key)) return skills;
  }
  return ['Critical Thinking', 'Problem Solving', 'Communication', 'Teamwork'];
};

const getLocation = (institution) => {
  // Mock function, replace with actual logic or data if available
  const locationMap = {
    'Universitas Gadjah Mada': 'Yogyakarta, Indonesia',
    'Institut Teknologi Bandung': 'Bandung, Indonesia',
    'SMK Telkom Purwokerto': 'Purwokerto, Indonesia',
  };
  for (const [key, location] of Object.entries(locationMap)) {
    if (institution.includes(key)) return location;
  }
  return 'Lokasi tidak diketahui';
};

const getStatus = (period) => {
  // Mock function, replace with actual logic or data if available
  if (period.toLowerCase().includes('sekarang') || period.toLowerCase().includes('present')) {
    return 'Sedang Berlangsung';
  }
  return 'Lulus';
};

// Lifecycle
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5173/api/cv-data');
    if (response.data && Array.isArray(response.data.educations)) {
      educations.value = response.data.educations;
    }
  } catch (error) {
    console.error('Gagal mengambil data pendidikan:', error);
    // Fallback data for demonstration if API fails
    educations.value = [
      { id: 1, institution: 'Universitas Gadjah Mada', major: 'S1 Teknik Informatika', period: '2021 - Sekarang' },
      { id: 2, institution: 'SMK Telkom Purwokerto', major: 'Rekayasa Perangkat Lunak', period: '2018 - 2021' },
    ];
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>

:root {
  --dracula-bg: #282a36;
  --dracula-current-line: #44475a;
  --dracula-selection: #44475a;
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
  background: var(--dracula-bg);
  color: var(--dracula-foreground);
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--dracula-cyan), var(--dracula-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-divider {
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, var(--dracula-cyan), var(--dracula-purple));
  border-radius: 2px;
}

.subtitle {
  color: var(--dracula-comment);
  font-size: 1.1rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--dracula-current-line);
  border-top: 3px solid var(--dracula-cyan);
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

.education-card {
  background: #44475A;
  border: 1px solid rgba(98, 114, 164, 0.3);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.education-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgb(255, 255, 255) !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
}

.education-card.hovered .animated-border {
  opacity: 1;
}

.animated-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
  padding: 2px;
  background: linear-gradient(45deg, var(--dracula-cyan), var(--dracula-purple), var(--dracula-pink));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.animated-border::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: #44475A;
  border-radius: 13px;
}

.card-body {
  position: relative;
  z-index: 2;
}

.icon-wrapper {
  width: 55px;
  height: 55px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.education-card:hover .icon-wrapper {
  transform: rotate(360deg) scale(1.1);
}

.education-icon {
  font-size: 1.4rem;
  color: white;
}

.icon-variant-1 { background: linear-gradient(135deg, var(--dracula-cyan), var(--dracula-purple)); }
.icon-variant-2 { background: linear-gradient(135deg, var(--dracula-purple), var(--dracula-pink)); }
.icon-variant-3 { background: linear-gradient(135deg, var(--dracula-green), var(--dracula-cyan)); }
.icon-variant-4 { background: linear-gradient(135deg, var(--dracula-orange), var(--dracula-red)); }

.education-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  border: 1px solid;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-sarjana {
  background: rgba(139, 233, 253, 0.15);
  color: var(--dracula-cyan);
  border-color: var(--dracula-cyan);
}

.badge-magister {
  background: rgba(189, 147, 249, 0.15);
  color: var(--dracula-purple);
  border-color: var(--dracula-purple);
}

.badge-doktor {
  background: rgba(255, 121, 198, 0.15);
  color: var(--dracula-pink);
  border-color: var(--dracula-pink);
}

.badge-diploma {
  background: rgba(80, 250, 123, 0.15);
  color: var(--dracula-green);
  border-color: var(--dracula-green);
}

.badge-menengah {
  background: rgba(241, 250, 140, 0.15);
  color: var(--dracula-yellow);
  border-color: var(--dracula-yellow);
}

.badge-default {
  background: rgba(255, 184, 108, 0.15);
  color: var(--dracula-orange);
  border-color: var(--dracula-orange);
}

.expand-indicator {
  color: var(--dracula-comment);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.expand-indicator.expanded {
  transform: rotate(180deg);
  color: var(--dracula-cyan);
}

.card-title {
  color: var(--dracula-foreground);
  font-size: 1.3rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.education-card:hover .card-title {
  color: var(--dracula-cyan);
}

.major-info {
  font-size: 0.95rem;
}

.major-text {
  color: var(--dracula-foreground);
  font-weight: 500;
}

.period-text {
  color: var(--dracula-comment);
}

.text-primary-custom {
  color: var(--dracula-cyan) !important;
}

.text-secondary-custom {
  color: var(--dracula-comment) !important;
}

.details-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--dracula-cyan), transparent);
  opacity: 0.4;
}

.education-details {
  font-size: 0.9rem;
}

.detail-item {
  color: var(--dracula-comment);
  display: flex;
  align-items: center;
}

.detail-item i {
  width: 16px;
  color: var(--dracula-cyan);
}

.skill-tag {
  background: var(--dracula-bg);
  color: var(--dracula-green);
  border: 1px solid rgba(80, 250, 123, 0.4);
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  animation: skillAppear 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes skillAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.details-expand-enter-active,
.details-expand-leave-active {
  transition: all 0.4s ease;
}

.details-expand-enter-from,
.details-expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.details-expand-enter-to,
.details-expand-leave-from {
  opacity: 1;
  max-height: 300px;
  transform: translateY(0);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 15px;
  z-index: 1;
}

.education-card:hover .card-overlay {
  opacity: 0.08;
}

.overlay-variant-1 { background: linear-gradient(135deg, var(--dracula-cyan), var(--dracula-purple)); }
.overlay-variant-2 { background: linear-gradient(135deg, var(--dracula-purple), var(--dracula-pink)); }
.overlay-variant-3 { background: linear-gradient(135deg, var(--dracula-green), var(--dracula-cyan)); }
.overlay-variant-4 { background: linear-gradient(135deg, var(--dracula-orange), var(--dracula-red)); }

.empty-state {
  padding: 3rem 1rem;
}

.empty-icon {
  font-size: 4rem;
  color: var(--dracula-comment);
  opacity: 0.4;
}

.empty-text {
  color: var(--dracula-comment);
  font-size: 1.1rem;
  margin: 0;
}



@media (max-width: 576px) {
  .icon-wrapper {
    width: 50px;
    height: 50px;
  }
  
  .education-icon {
    font-size: 1.2rem;
  }
  
  .card-title {
    font-size: 1.1rem;
  }

}
</style>