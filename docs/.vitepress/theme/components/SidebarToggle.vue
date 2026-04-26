<script setup lang="ts">
import { ref, onMounted } from 'vue'

const hidden = ref(true)

onMounted(() => {
  hidden.value = localStorage.getItem('sidebar-hidden') === 'true'
  document.documentElement.classList.toggle('sidebar-hidden', hidden.value)
})

function toggle() {
  hidden.value = !hidden.value
  localStorage.setItem('sidebar-hidden', String(hidden.value))
  document.documentElement.classList.toggle('sidebar-hidden', hidden.value)
}
</script>

<template>
  <button class="sidebar-toggle-btn" @click="toggle" :title="hidden ? 'Sidebar einblenden' : 'Sidebar ausblenden'">
    <span>{{ hidden ? '›' : '‹' }}</span>
  </button>
</template>

<style scoped>
.sidebar-toggle-btn {
  position: fixed;
  top: 50vh;
  left: 0;
  z-index: 30;
  width: 20px;
  height: 48px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-left: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  font-size: 16px;
  transition: background 0.2s, color 0.2s;
}

.sidebar-toggle-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

@media (max-width: 959px) {
  .sidebar-toggle-btn {
    display: none;
  }
}
</style>
