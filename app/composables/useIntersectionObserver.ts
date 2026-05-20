import { onMounted, onUnmounted, ref } from 'vue';

export function useIntersectionObserver(elementRef: any) {
  const isVisible = ref(false);

  let observer: IntersectionObserver;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => { 
        const entry = entries[0]; 

        if (entry && entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (elementRef.value) {
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return { isVisible };
}