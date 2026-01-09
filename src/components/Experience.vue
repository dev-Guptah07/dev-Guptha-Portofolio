<script setup lang="ts">
import { onMounted } from 'vue'
import { useExperienceStore } from '../stores/useExperienceStore'

const store = useExperienceStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <section id="experience" class="min-h-screen py-20 px-4" style="background-color: rgba(36,31,46,0.55); border-top: 1px solid rgba(255,255,255,0.02); backdrop-filter: blur(3px);">
    <div class="container mx-auto max-w-5xl">
      <h2 class="gradient-header-purple text-5xl font-bold mb-12">Experience</h2>
      
      <div class="space-y-8">
        <div v-for="job in store.items" :key="job.title" class="bg-[#2d2738] rounded-lg p-6 border-l-4 border-purple-500">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h3 class="text-2xl font-bold text-purple-400">{{ job.title }}</h3>
            <span class="text-beige-400 text-sm">{{ job.period }}</span>
          </div>
          <p class="text-beige-300 font-semibold mb-3">{{ job.company }}</p>
          <ul class="list-disc list-inside space-y-2 text-beige-200 ml-4">
            <li v-for="(h, i) in job.highlights" :key="i">{{ h }}</li>
          </ul>
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

