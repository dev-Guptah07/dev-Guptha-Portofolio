<script setup lang="ts">
import { onMounted } from 'vue'
import { useProjectsStore } from '../stores/useProjectsStore'

const store = useProjectsStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <section id="projects" class="min-h-screen py-20 px-4" style="background-color: rgba(36,31,46,0.62); border-top: 1px solid rgba(255,255,255,0.02); backdrop-filter: blur(3px);">
    <div class="container mx-auto max-w-6xl">
      <h2 class="gradient-header-purple text-5xl font-bold mb-12 text-center">Projects</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="project in store.items" 
          :key="project.title"
          class="bg-[#2d2738] rounded-lg p-6 border border-[#3b2f4a] hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <h3 class="text-xl font-bold text-purple-400 mb-3">{{ project.title }}</h3>
          <p class="text-beige-200 text-sm mb-4 leading-relaxed">{{ project.description }}</p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="text-xs px-2 py-1 bg-[#1a1625] text-beige-300 rounded"
            >
              {{ tech }}
            </span>
          </div>
          
          <!-- <div class="flex gap-4">
            <a 
              :href="project.link" 
              target="_blank"
              class="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
            >
              Live Demo →
            </a>
            <a 
              :href="project.github" 
              target="_blank"
              class="text-beige-400 hover:text-beige-300 text-sm font-semibold transition-colors"
            >
              GitHub →
            </a>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-header-purple {
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 30%, #c084fc 60%, #f5f3ed 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0.4px rgba(255, 255, 255, 0.25);
  paint-order: stroke fill;
  letter-spacing: 0.4px;
}
</style>

