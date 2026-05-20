<template>
  <section id="contact" class="contact-section section" ref="vantaRef">
    <div class="container reveal" :class="{ 'is-visible': isVisible }">
      <div class="section-header">
        <p class="eyebrow">КОНТАКТЫ</p>
        <h2 class="section-title">Давайте обсудим детали</h2>
      </div>

      <div class="contact-wrapper">
        <form @submit.prevent="submitForm" class="contact-form glass-card">
          <div class="form-group">
            <label for="name">Имя</label>
            <input type="text" id="name" v-model="form.name" placeholder="Как к вам обращаться?" required />
          </div>

          <div class="form-group">
            <label for="tguser">Ваше имя пользователя telegram</label>
            <input type="text" v-model="form.tguser" placeholder="@user" required />
          </div>

          <div class="form-group">
            <label for="message">Сообщение</label>
            <textarea id="message" v-model="form.message" rows="5" placeholder="Расскажите о вашей задаче..." required></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Отправка...' : 'Отправить сообщение' }}
          </button>

          <p v-if="status.message" :class="['status-message', status.type]">
            {{ status.message }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min.js';

const vantaRef = ref(null);
let vantaEffect: any = null;
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (vantaRef.value) {
    vantaEffect = NET({
      el: vantaRef.value,
      THREE: THREE,
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xFFFFFF,       
      backgroundColor: 0x00000, 
      points: 8.00,         
      maxDistance: 20.00,
      spacing: 20.00
    });
      resizeObserver = new ResizeObserver(() => {
      if (vantaEffect) {
        vantaEffect.resize();
      }
    });

    resizeObserver.observe(vantaRef.value);
  }
});

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy();
  if (resizeObserver) resizeObserver.disconnect();
});

const contactSection = ref(null);
const { isVisible } = useIntersectionObserver(contactSection);

const form = reactive({
  name: '',
  tguser: '',
  message: ''
});

const isLoading = ref(false);
const status = reactive({ type: '', message: '' });

async function submitForm() {
  isLoading.value = true;
  status.message = '';

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form
    });

    status.type = 'success';
    status.message = 'Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.';
    form.name = '';
    form.tguser = '';
    form.message = '';
  } catch (error) {
    status.type = 'error';
    status.message = 'Произошла ошибка. Пожалуйста, попробуйте позже.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.contact-section {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0;
  padding-bottom: 0;
}

.container {
  position: relative;
  z-index: 1;
  width: 100%;
}

.section-header { text-align: center; margin-bottom: var(--spacing-xl); }
.eyebrow { 
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  letter-spacing: 2px;
  text-transform: uppercase;  
}
.section-title { 
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: var(--spacing-md);
}

.contact-wrapper {
  display: flex;
  justify-content: center;
}

.contact-form {
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background: rgba(20, 20, 20, 0.6); 
  border-radius: 12px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

input, textarea {
  width: 100%;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s, background-color 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: rgba(255, 255, 255, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: var(--glow-gradient);
  color: white;
  border: none;
  border-radius: 100px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(138, 63, 252, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.status-message {
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
}
.status-message.success { color: #4ade80; }
.status-message.error { color: #f87171; }

@media (max-width: 768px) {
  .contact-section {
    min-height: auto;
    display: block;
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);
  }

  .contact-form {
    padding: 20px;
  }
  
  .section-title {
    font-size: 2rem;
  }

  .container {
    padding-top: 10px;
  }

  .eyebrow{ 
    padding-bottom: 5px;
  }
}
</style>