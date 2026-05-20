<template>
  <div>
    <header v-if="!isMobileMenuOpen" class="app-header">
      <div class="header-bar">
        <NuxtLink to="/" @click.prevent="scrollToSection('#home')" class="header-logo">
          ICHERA087
        </NuxtLink>

        <nav class="desktop-nav">
          <a href="#about" class="nav-link" @click.prevent="scrollToSection('#about')">Обо мне</a>
          <a href="#stack" class="nav-link" @click.prevent="scrollToSection('#stack')">Стек</a>
          <a href="#projects" class="nav-link" @click.prevent="scrollToSection('#projects')">Проекты</a>
        </nav>

        <AppButton
          tag="a"
          href="https://t.me/ichera087"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="sm"
          class="desktop-cta"
        >
          Связаться
        </AppButton>

        <button
          class="menu-trigger mobile-only"
          @click="toggleMobileMenu"
          :class="{ 'is-open': isMobileMenuOpen }"
          aria-label="Открыть меню"
        >
          <div class="hamburger">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
          </div>
        </button>
      </div>
  </header>

    <Transition name="slide-in-left">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <button
          class="close-trigger"
          @click="toggleMobileMenu"
          aria-label="Закрыть меню"
        >
          <div class="hamburger is-open">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
          </div>
        </button>

        <nav class="mobile-nav">
          <a href="#about" class="mobile-nav-link" @click="closeMobileMenu" @click.prevent="scrollToSection('#about')">Обо мне</a>
          <a href="#stack" class="mobile-nav-link" @click="closeMobileMenu" @click.prevent="scrollToSection('#stack')">Стек</a>
          <a href="#projects" class="mobile-nav-link" @click="closeMobileMenu" @click.prevent="scrollToSection('#projects')">Проекты</a>
          <a href="https://t.me/ichera087" target="_blank" rel="noopener noreferrer" class="mobile-nav-link">Связаться</a>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function scrollToSection(selector: string) {
  if (isMobileMenuOpen.value) {
    closeMobileMenu();
}

const element = document.querySelector(selector);
  
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else if (selector === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

watch(isMobileMenuOpen, (isOpen) => {
  if (process.client) {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
});
</script>

<style scoped>
.app-header {
  position: fixed;
  top: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 100%;
  max-width: 95%;
  padding: 0 var(--spacing-md);
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  border-radius: 100px;
  background-color: rgba(25, 25, 25, 0.4);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.header-logo {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text-primary);
  text-decoration: none;
  letter-spacing: 1px;
}

.desktop-nav {
  display: flex;
  gap: var(--spacing-lg);
}
.nav-link {
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}
.nav-link:hover {
  color: var(--color-text-primary);
}

.desktop-cta{
    display: none !important;
}

.menu-trigger {
  display: none;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-weight: 500;
  transition: color var(--transition);
}
.menu-trigger:hover {
  color: var(--color-text-primary);
}
.hamburger {
  position: relative;
  width: 24px;
  height: 14px;
}
.hamburger .line {
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: all 0.3s ease-in-out;
}
.line-1 { top: 0; }
.line-2 { top: 50%; transform: translateY(-50%); }
.line-3 { bottom: 0; }
.is-open .line-1 {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}
.is-open .line-2 {
  opacity: 0; 
}
.is-open .line-3 {
  top: 50%; 
  transform: translateY(-50%) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0; 
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background); 
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 80px 120px 80px;
}

.close-trigger {
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 1011;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 10px;
  height: 60px;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.mobile-nav-link {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition);
  width: 100%; 
  text-align: center; 
  padding: var(--spacing-md) 0;
}
.mobile-nav-link:hover {
  color: var(--color-text-primary);
}

.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-in-left-enter-from,
.slide-in-left-leave-to {
  transform: translateX(100%); 
}

@media (min-width: 769px) {
  .desktop-cta {
    display: inline-flex !important; 
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none; 
  }
  .menu-trigger {
    display: flex; 
  }
}
</style>