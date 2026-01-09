<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContactStore } from '../stores/useContactStore'

const store = useContactStore()

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  // Use contact store to send message
  const res = await store.sendMessage(formData.value)
  if (res && res.ok) {
    console.log('Message sent')
  } else {
    console.error('Message failed', res)
  }
  // Reset form
  formData.value = { name: '', email: '', subject: '', message: '' }
}

onMounted(async () => {
  await store.load()
})
</script>

<template>
  <section id="contact" class="min-h-screen py-20 px-4" style="background-color: rgba(38,33,48,0.65); border-top: 1px solid rgba(255,255,255,0.02); backdrop-filter: blur(3px);">
    <div class="container mx-auto max-w-4xl">
      <h2 class="gradient-header-purple text-5xl font-bold mb-12 text-center">Get In Touch</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div>
          <h3 class="text-2xl font-bold text-purple-400 mb-6">Let's Connect</h3>
          <p class="text-beige-200 mb-8 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. 
            Feel free to reach out!
          </p>
          
          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-4">
              <span class="text-2xl">📧</span>
              <div>
                <p class="text-beige-400 text-sm">Email</p>
                <a :href="`mailto:${store.email}`" class="text-purple-400 hover:text-purple-300 transition-colors">{{ store.email }}</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-2xl">📱</span>
              <div>
                <p class="text-beige-400 text-sm">Phone</p>
                <a :href="`tel:${store.phone}`" class="text-purple-400 hover:text-purple-300 transition-colors">{{ store.phone }}</a>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-2xl">📍</span>
              <div>
                <p class="text-beige-400 text-sm">Location</p>
                <p class="text-beige-200">Available for Remote Work</p>
              </div>
            </div>
          </div>
          
          <!-- Social Links -->
          <div>
            <h4 class="text-lg font-semibold text-purple-400 mb-4">Follow Me</h4>
            <div class="flex gap-4">
              <a 
                v-for="social in store.socialLinks" 
                :key="social.name"
                :href="social.url"
                target="_blank"
                class="w-12 h-12 bg-[#2d2738] rounded-lg flex items-center justify-center text-2xl hover:bg-purple-600 transition-colors border border-[#3b2f4a] hover:border-purple-500"
                :title="social.name"
              >
                {{ social.icon }}
              </a>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div>
          <form @submit="handleSubmit" class="space-y-6">
            <div>
              <label for="name" class="block text-beige-300 text-sm font-medium mb-2">Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-[#2d2738] border border-[#3b2f4a] rounded-lg text-beige-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label for="email" class="block text-beige-300 text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-[#2d2738] border border-[#3b2f4a] rounded-lg text-beige-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label for="subject" class="block text-beige-300 text-sm font-medium mb-2">Subject</label>
              <input
                id="subject"
                v-model="formData.subject"
                type="text"
                required
                class="w-full px-4 py-3 bg-[#2d2738] border border-[#3b2f4a] rounded-lg text-beige-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="What's this about?"
              />
            </div>
            
            <div>
              <label for="message" class="block text-beige-300 text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="5"
                required
                class="w-full px-4 py-3 bg-[#2d2738] border border-[#3b2f4a] rounded-lg text-beige-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
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

