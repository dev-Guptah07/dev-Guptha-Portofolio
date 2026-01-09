<script setup lang="ts">
import Navigation from '../components/Navigation.vue'
import About from '../components/About.vue'
import Experience from '../components/Experience.vue'
import TechStack from '../components/TechStack.vue'
import Projects from '../components/Projects.vue'
import Articles from '../components/Articles.vue'
import Contact from '../components/Contact.vue'
import StarField from '../components/StarField.vue'
</script>

<template>
  <div class="min-h-screen bg-[#1a1625] text-[#f5f3ed] relative">
    <StarField class="fixed inset-0 pointer-events-none z-0 opacity-100" />
    <Navigation />
    <main class="pt-16 relative z-10">
      <About />
      <Experience />
      <TechStack />
      <Projects />
      <Articles />
      <Contact />
    </main>
  </div>
</template>

<style scoped>
</style>

