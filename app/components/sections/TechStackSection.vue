<template>
  <section id="stack" class="tech-stack-section section">
    <canvas ref="matrixCanvas" class="matrix-canvas"></canvas>

    <div class="container reveal" :class="{ 'is-visible': isVisible }">
      <div class="stack-grid">
        <div class="stack-header">
          <p class="eyebrow">СТЕК</p>
          <h2 class="section-title">
            Full-stack разработка на JavaScript
          </h2>
        </div>

        <div class="stack-list">
          <div v-for="stack in techStacks" :key="stack.name" class="stack-item">
            <h3 class="stack-name">{{ stack.name }}</h3>
            <p class="stack-description">{{ stack.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const stackSection = ref(null);
const { isVisible } = useIntersectionObserver(stackSection);

interface Stack {
  name: string;
  description: string;
}

const techStacks: Stack[] = [
  { 
    name: 'Frontend (Vue.js)', 
    description: 'Vue 3, TypeScript, Pinia, Vue Router, Vite. Проектирование сложных, реактивных приложений с фокусом на чистую архитектуру и производительность.' 
  },
  { 
    name: 'Backend (Node.js)', 
    description: 'Node.js, Express. Разработка REST API, серверная логика и взаимодействие с базами данных для создания полноценных клиент-серверных систем.' 
  },
  { 
    name: 'Базы данных (MongoDB)', 
    description: 'Работаю с MongoDB и Mongoose, проектируя структуры данных, которые легко расширяются и не ломаются со временем.' 
  },
  { 
    name: 'Аутентификация и API', 
    description: 'Реализую безопасную систему аутентификации и авторизации с использованием JWT и современных best practices.' 
  },
  { 
    name: 'Инструменты и DevOps', 
    description: 'Docker, Git, GitHub. Контейнеризация приложений для консистентной среды разработки и развертывания, а также полный контроль версий кода.' 
  },
];

const matrixCanvas = ref<HTMLCanvasElement | null>(null);
const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}()/*&%$#@!";

let animationFrameId: number;

function getRandomCharacter(): string | undefined { 
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

onMounted(() => {
  const canvas = matrixCanvas.value;
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) {
    console.error("Canvas или 2D context не найден!");
    return; 
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let fontSize;

  if (canvas.width > 1000) { fontSize = 14; }
  else { fontSize = 8 }

  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(0);

  function draw() {
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(173, 255, 47, 0.5)'; 
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) { 
      const text = getRandomCharacter();

      if (text) {
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      }
      
      drops[i]++;

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }
  draw();
}); 

onUnmounted(() => { 
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.tech-stack-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 0;
  position: relative;
  overflow: hidden;
}

.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.stack-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

@media (min-width: 900px) {
  .stack-grid {
    grid-template-columns: 1fr 1.5fr; 
    gap: var(--spacing-xl);
  }
}

.eyebrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
}

.section-title {
  color: var(--color-text-primary); 
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
}

.stack-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.stack-item {
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}
.stack-item:last-child {
  border-bottom: none;
}

.stack-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.stack-description {
  color: var(--color-text-secondary);
  max-width: 60ch; 
}

@media(max-width: 900px) { 
  .tech-stack-section { 
    min-height: auto;
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);
  }

  .container { 
    padding-top: 10px;
  }

}
</style>