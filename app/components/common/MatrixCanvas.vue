<template>
  <canvas ref="canvasEl" class="matrix-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  characterSet: string;
}>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

function setup() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  const canvas = canvasEl.value;
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  const fontSize = 12;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(0);
  let frameCount = 0;
  const speed = 4;

  function draw() {
    animationFrameId = requestAnimationFrame(draw);
    frameCount++;
    if (frameCount % speed !== 0) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#013220';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = props.characterSet[Math.floor(Math.random() * props.characterSet.length)];
      
      if (text) {
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      }
      
      drops[i]++;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }
  }
  draw();
}

watch(() => props.characterSet, setup, { immediate: true });

onMounted(() => {
  
  window.addEventListener('resize', setup);
});

onUnmounted(() => {
  window.removeEventListener('resize', setup);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>