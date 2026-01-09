<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useNavStore } from '../stores/useNavStore'
import { useSiteStore } from '../stores/useSiteStore'
// Logo asset
import NavIcon from '../assets/NavIcon.png'

const activeSection = ref('about')
const nav = useNavStore()
const site = useSiteStore()
const sections = computed(() => nav.items)

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = sectionId
  }
}

const handleScroll = () => {
  const navEl = document.querySelector('nav')
  const navHeight = navEl ? navEl.offsetHeight : 0
  const scrollPosition = window.scrollY + navHeight + 10
  const items = sections.value || []

  for (let i = items.length - 1; i >= 0; i--) {
    const section = items[i]
    if (section) {
      const element = document.getElementById(section.id)
      if (element) {
        const offsetTop = element.offsetTop
        if (scrollPosition >= offsetTop) {
          activeSection.value = section.id
          break
        }
      }
    }
  }
}

onMounted(async () => {
  await Promise.all([nav.load(), site.load()])
  handleScroll() // Initial check (after nav items loaded)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#241f2e]/95 backdrop-blur-sm border-b border-[#3b2f4a]">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-center lg:justify-between h-16">
        <a href="#about" @click.prevent="scrollToSection('about')" class="inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500/40" aria-label="Home" title="devGuptah Portfolio">
          <img :src="NavIcon" alt="devGuptah Portfolio logo" class="w-64 h-64 object-contain" />
        </a>
        <div class="hidden lg:flex gap-6">
          <a
            v-for="section in sections"
            :key="section.id"
            @click.prevent="scrollToSection(section.id)"
            :class="[
              'cursor-pointer transition-colors duration-200',
              activeSection === section.id
                ? 'text-purple-400 font-semibold'
                : 'text-beige-300 hover:text-purple-400'
            ]"
          >
            {{ section.label }}
          </a>
        </div>
        <!-- Mobile menu button (hidden on mobile/tablet per design) -->
        <button class="hidden" aria-hidden="true">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>

