<template>
  <section class="hero-section section" ref="vantaRef" id="home">
    <div class="container hero-grid">
      <div class="hero-text">
        <h1 class="hero-title">
          <span ref="typewriterEl"></span>
        </h1>
        <p class="hero-subtitle">
          Создаю современные и производительные веб-интерфейсы, которые приятно использовать.
        </p>
        <div class="hero-cta">
          <AppButton tag="a" href="#projects" class="projects-batton">Мои работы</AppButton>
        </div>
      </div>
      <div class="hero-visual"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import GLOBE from 'vanta/dist/vanta.globe.min.js';
import * as THREE from 'three';
import Typewriter from 'typewriter-effect/dist/core';

const vantaRef = ref(null);
let vantaEffect: any = null;

const typewriterEl = ref(null)

onMounted(() => {
  if (vantaRef.value) {
    vantaEffect = GLOBE({
      el: vantaRef.value,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 0.00,
      scaleMobile: 1.00,
      color: 0xFFFFFF, 
      backgroundColor: 0x000000, 
      size: 1.30
    });
  }

  if(typewriterEl.value) { 
    const typewriter = new Typewriter(typewriterEl.value, {
      loop: true, 
      delay: 75, 
      autoStart: true,
    })

    typewriter 
      .typeString('Full-stack Developer & Digital Architect')
      .pauseFor(3000)
      .deleteAll()
      .pauseFor(1000)
      .start();
  }
});

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy();
  }
});
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 100px; 
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: var(--spacing-xl);
}
@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: var(--spacing-md);
}
.hero-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  max-width: 450px;
  margin-bottom: var(--spacing-lg);
}
.hero-cta {
  display: flex;
}
</style>