import { defineStore } from 'pinia'
import { fetchJSON, postJSON } from '../services/api'

export interface SocialLink { name: string; url: string; icon?: string }
export interface ContactState { email: string; phone?: string; location?: string; socialLinks: SocialLink[] }

export const useContactStore = defineStore('contact', {
  state: (): ContactState => ({ email: '', phone: '', location: '', socialLinks: [] }),
  actions: {
    async load() {
      const data = await fetchJSON<ContactState>('/data/contact.json')
      this.email = data.email
      this.phone = data.phone
      this.location = data.location
      this.socialLinks = data.socialLinks
    },
    async sendMessage(payload: { name: string; email: string; subject: string; message: string }) {
      // In a real app, post to an API endpoint. Here we simulate by POST to /api/contact (may be proxied to a serverless function)
      try {
        // If no backend exists, this will likely fail; callers should handle errors.
        await postJSON('/api/contact', payload)
        return { ok: true }
      } catch (e) {
        console.error('sendMessage failed', e)
        // fallback: return success for development
        return { ok: false, error: e }
      }
    }
  }
})
