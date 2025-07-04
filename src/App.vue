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
  <div class="container mt-5 pt-5">
    <Hero id="profil" />
    <About id="tentang" />
    <Experience id="pengalaman" />
    <Education id="pendidikan" />
    <Skills id="skill" />
  </div>
  <Footer id="kontak" />
</template>

<style>
/* Tambahkan sedikit padding antar section untuk jarak */
section {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
</style>