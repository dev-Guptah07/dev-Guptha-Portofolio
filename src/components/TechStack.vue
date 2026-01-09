<script setup lang="ts">
import { onMounted } from 'vue'
import { useTechStore } from '../stores/useTechStore'

const store = useTechStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <section id="tech-stack" class="min-h-screen py-20 px-4">
    <div class="container mx-auto max-w-6xl">
      <h2 class="gradient-header-purple text-5xl font-bold mb-12 text-center">Tech Stack</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="category in store.categories" 
          :key="category.title"
          class="bg-[#241f2e] rounded-lg p-6 border border-[#3b2f4a]"
        >
          <h3 class="text-2xl font-bold text-purple-400 mb-6">{{ category.title }}</h3>
          <div class="space-y-4">
            <div 
              v-for="tech in category.technologies" 
              :key="tech.name"
              class="flex items-center justify-between p-3 bg-[#2d2738] rounded-lg hover:bg-[#3b2f4a] transition-colors"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ tech.icon }}</span>
                <span class="text-beige-200 font-medium">{{ tech.name }}</span>
              </div>
              <span class="text-beige-400 text-sm px-3 py-1 bg-[#1a1625] rounded-full">
                {{ tech.level }}
              </span>
            </div>
          </div>
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

