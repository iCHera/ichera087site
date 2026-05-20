<template>
  <section id="projects" class="projects-section section">
    <div class="container reveal">
      <div class="section-header">
        <p class="eyebrow">ПОРТФОЛИО</p>
        <h2 class="section-title">Мои проекты</h2>
      </div>

      <div class="projects-grid">
        <a 
          v-for="project in projects" 
          :key="project.title" 
          :href="project.liveUrl" 
          target="_blank" 
          class="project-card"
        >

        <img :src="config.app.baseURL + project.image" :alt="project.title" class="card-image" />

          <div class="card-content">
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-description">{{ project.description }}</p>
            <div class="card-tags">
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const config = useRuntimeConfig();

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: 'CHARUEL',
    description: 'Поддержка и развитие клиентской части официального интернет-магазина бренда одежды. Работа с каталогом, карточками товаров, корзиной и адаптивной версткой.',
    image: '/screenSite/charuel.png',
    liveUrl: 'https://www.charuel.ru/',
  },
  {
    title: 'TopBoutique',
    description: 'Разработка интерфейса для мультибрендового магазина одежды. Реализация каталога, фильтров, сортировки и базовых пользовательских сценариев.',
    image: 'screenSite/topboutique.png',
    liveUrl: 'https://topboutique.by/',
  },
  {
    title: 'KIXBOX',
    description: 'Работа над фронтендом интернет-магазина streetwear-бренда. Оптимизация отображения каталога и загрузки изображений.',
    image: 'screenSite/kixbox.png',
    liveUrl: 'https://kixbox.ru/',
  },
  {
    title: 'Edem-Room',
    description: 'Frontend-разработка интернет-магазина женской одежды с упором на мобильную версию и удобную навигацию.',
    image: 'screenSite/edem-room.png',
    liveUrl: 'https://edem-room.ru/',
  },
  {
    title: 'LOVE REPUBLIC',
    description: 'Поддержка и доработка пользовательского интерфейса официального онлайн-магазина. Работа с каталогом, корзиной и личным кабинетом.',
    image: 'screenSite/loverepublic.png',
    liveUrl: 'https://loverepublic.ru/',
  },
  {
    title: 'Ecosmart Studio',
    description: 'Разработка промо-сайта для фитнес-студии. Верстка страниц, анимации интерфейса и адаптация под мобильные устройства.',
    image: 'screenSite/ecosmartstudio.png',
    liveUrl: 'https://ecosmartstudio.ru/',
  },
  {
    title: 'Blue Shadow',
    description: 'Создание интернет-магазина польского бренда одежды. Реализация адаптивной верстки и многоязычного интерфейса.',
    image: 'screenSite/blueshadow.png',
    liveUrl: 'https://blueshadow.pl/',
  },
  {
    title: 'Allma',
    description: 'Создание простого и быстрого сайта для креативного агентства. Статическая генерация страниц и минималистичный интерфейс.',
    image: 'screenSite/allma.png',
    liveUrl: 'https://allma.am/',
  },
];


</script>

<style scoped>
.section-header { text-align: center; margin-bottom: var(--spacing-xl); padding-top: 20px;}
.eyebrow { font-size: 0.9rem; font-weight: 700; color: var(--color-text-secondary); letter-spacing: 2px; text-transform: uppercase; }
.section-title { 
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: var(--spacing-md);
 }

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}
@media (min-width: 768px) {
  .projects-grid { grid-template-columns: 1fr 1fr; }
}

.project-card {
  position: relative;
  display: block;
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background-color: #1a1a1a;
  text-decoration: none;
  transition: transform var(--transition);
}

.card-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-content {
  padding: var(--spacing-md);
}
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}
.card-description {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  background-color: #333;
  color: var(--color-text-primary);
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (min-width: 769px) {
  .project-card {
    aspect-ratio: 16 / 10; 
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0) 100%);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity var(--transition), transform var(--transition);
  }

  .project-card:hover .card-content {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card:hover .card-image {
    transform: scale(1.05);
    filter: brightness(0.4) blur(4px);
  }
}
</style>