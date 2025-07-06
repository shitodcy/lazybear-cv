<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Experience from './components/Experience.vue';
import Education from './components/Education.vue';
import Skills from './components/Skills.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar />

  <main class="main-content">
    <div class="container">
      <Hero id="profil" class="py-5" />

      <div class="section-divider"></div>
      <About id="tentang" class="py-5" />

      <div class="section-divider"></div>
      <Experience id="pengalaman" class="py-5" />

      <div class="section-divider"></div>
      <Education id="pendidikan" class="py-5" />

      <div class="section-divider"></div>
      <Skills id="skill" class="py-5" />
    </div>
  </main>

  <Footer id="kontak" />
</template>

<style>

.main-content {
  margin-top: 70px;
}

.section-divider {
  border-top: 1px solid var(--bs-secondary);
  opacity: 0.2;
  margin: 2rem auto;
  width: 50%;
}
</style>