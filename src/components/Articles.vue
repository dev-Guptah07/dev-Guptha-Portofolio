<script setup lang="ts">
import { onMounted } from 'vue'
import { useArticlesStore } from '../stores/useArticlesStore'

const store = useArticlesStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <section id="articles" class="min-h-screen py-20 px-4">
    <div class="container mx-auto max-w-4xl">
      <h2 class="gradient-header-purple text-5xl font-bold mb-12 text-center">Articles</h2>
      
      <div class="space-y-6">
        <article 
          v-for="article in store.items" 
          :key="article.title"
          class="bg-[#241f2e] rounded-lg p-6 border border-[#3b2f4a] hover:border-purple-500 transition-all duration-300 cursor-pointer group"
        >
          <div class="flex items-center gap-3 mb-3">
            <span class="px-3 py-1 bg-purple-600/20 text-purple-400 text-xs font-semibold rounded-full">
              {{ article.category }}
            </span>
            <span class="text-beige-400 text-xs">{{ article.date }}</span>
            <span class="text-beige-500 text-xs">•</span>
            <span class="text-beige-400 text-xs">{{ article.readTime }}</span>
          </div>
          
          <h3 class="text-xl font-bold text-purple-400 mb-3 group-hover:text-purple-300 transition-colors">
            {{ article.title }}
          </h3>
          
          <p class="text-beige-200 leading-relaxed">
            {{ article.excerpt }}
          </p>
          
          <div class="mt-4">
            <a 
              :href="article.link" 
              class="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors inline-flex items-center gap-2"
            >
              Read More 
              <span>→</span>
            </a>
          </div>
        </article>
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

