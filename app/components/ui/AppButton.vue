<template>
  <component :is="tag" class="app-button">
    <slot />
    <span class="arrow">→</span>
  </component>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    tag?: 'button' | 'a';
  }>(), {
    tag: 'button',
  });
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 100px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition: all var(--transition);
}
.app-button:hover {
  background-color: var(--color-text-primary);
  color: var(--color-background);
  border-color: var(--color-text-primary);
}
.arrow {
  transition: transform var(--transition);
}
.app-button:hover .arrow {
  transform: translateX(5px);
}
</style>