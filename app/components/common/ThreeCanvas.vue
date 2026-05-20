<template>
  <div ref="canvasContainer" class="canvas-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvasContainer = ref<HTMLDivElement | null>(null);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let model: THREE.Group; 
let animationFrameId: number;

function init() {
  const container = canvasContainer.value;
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 1, 5.5); 

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(
    '/models/human_body.glb',
    (glb) => {
      model = glb.scene;

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            wireframe: true,
          });
        }
      });

      model.scale.set(1, 1, 1);
      model.position.y = -1.2; 
      
      scene.add(model);
    },
    undefined,
    (error) => {
      console.error('An error happened while loading the model:', error);
    }
  );

  animate();
  window.addEventListener('resize', onWindowResize);
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  if (model) {
    model.rotation.y -= 0.003;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = canvasContainer.value;
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

onMounted(init);

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  cancelAnimationFrame(animationFrameId);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  cursor: grab;
}
.canvas-container:active {
  cursor: grabbing;
}
</style>