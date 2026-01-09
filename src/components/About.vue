<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '../stores/useProfileStore'

const store = useProfileStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <section id="about" class="relative overflow-hidden min-h-screen py-20 px-4 flex items-center">
    <div class="container mx-auto max-w-6xl relative z-10">
      <h2 class="gradient-header-purple text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-center">DotNet Full-Stack Developer</h2>
      <p class="text-beige-300 text-base sm:text-lg mb-6 text-center italic">an AI enthusiast...</p>
      <div class="flex flex-col md:flex-row gap-12 items-start md:items-center justify-center">
        <!-- Profile Image -->
        <div class="flex-shrink-0 hover:scale-105 transition-transform duration-300">
          <div class="relative profile-vignette">
            <img
              :src="store.profilePic"
              alt="Profile Picture"
              v-if="store.profilePic"
              class="w-56 h-56 md:w-72 md:h-72 rounded-2xl border-2 border border-white object-cover transition-shadow duration-300"
            />
            <div class="vignette-overlay" aria-hidden="true"></div>
          </div>
        </div>
        <!-- About Content -->
        <div class="flex-1 space-y-6 text-lg leading-relaxed about-content">
          <div class="mx-auto max-w-3xl">
            <p class="text-beige-200" v-for="(p, i) in store.bio" :key="i">{{ p }}</p>
            <div class="pt-6 text-center md:text-left">
              <a 
                href="#contact" 
                class="inline-block bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white px-8 py-3 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-purple-600/30 font-semibold transition-colors duration-200"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gradient-header-purple {
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 40%, #c084fc 80%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0.4px rgba(255, 255, 255, 0.25);
  paint-order: stroke fill;
  letter-spacing: 0.4px;
}

/* Vignette for profile image */
.profile-vignette {
  display: inline-block;
  position: relative;
  border-radius: 1rem; /* matches the rounded-2xl image */
  overflow: hidden;
}
.vignette-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* slightly stronger radial vignette: tighter transparent center, darker edges */
  background: radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.42) 100%);
  mix-blend-mode: multiply;
  transition: opacity 180ms ease;
}
/* on hover the vignette eases slightly to reveal more of the image */
.profile-vignette:hover .vignette-overlay {
  opacity: 0.65;
}

.about-content {
  max-width: 70ch;
  line-height: 1.65;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

@media (min-width: 768px) {
  .about-content { text-align: left; }
}

</style>

