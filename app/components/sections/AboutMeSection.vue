<template>
  <section id="about" class="about-section section" ref="aboutSection">
    <div class="container reveal" :class="{ 'is-visible': isVisible }">
      <div class="about-grid">
        <div class="about-visual">
          <ThreeCanvas />
        </div>

        <div class="about-text">
          <p class="eyebrow">ОБО МНЕ</p>
          <h2 class="section-title">
            Меня зовут Илья
          </h2>
          <p class="main-text">
            Я full-stack разработчик с коммерческим опытом более 3 лет. Занимаюсь программированием профессионально и постоянно развиваю свои навыки в создании современных веб-приложений.
          </p>
          <p class="main-text">
            Окончил Белорусский государственный университет по специальности «Информационные технологии». В своей работе сочетаю техническое мышление, внимание к деталям и понимание реальных задач бизнеса.
          </p>
          <p class="main-text">
            Имею опыт работы как в команде, так и на фрилансе — успешно реализовывал проекты для частных клиентов и компаний, самостоятельно ведя задачи от идеи до готового результата.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const aboutSection = ref(null);
const { isVisible } = useIntersectionObserver(aboutSection);
</script>

<style scoped>

.about-section{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 0;
  padding-bottom: 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  justify-content: space-between;
}

.about-visual {
  width: 100%;
}

.about-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.eyebrow {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.section-title {
font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: var(--spacing-md);
}
.main-text {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
  max-width: 60ch;
}

.main-text:last-child {
  margin-bottom: 0;
}

.principles-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
.principles-list li {
  padding-left: 30px;
  position: relative;
}
.principles-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 4px;
  color: var(--color-text-primary);
  font-weight: 700;
}
.principles-list strong {
  color: var(--color-text-primary);
  font-weight: 700;
}

@media (max-width: 768px) {
.about-grid { 
  display: grid;
  grid-template-columns: 1fr;
}

.about-visual {
  height: 350px;
}

.about-section {
  min-height: auto;
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}
}
</style>