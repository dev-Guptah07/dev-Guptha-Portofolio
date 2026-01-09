import { defineStore } from 'pinia'
import { fetchJSON } from '../services/api'

export interface ExperienceItem { title: string; company: string; period: string; highlights: string[] }

export const useExperienceStore = defineStore('experience', {
  state: () => ({ items: [] as ExperienceItem[], loading: false }),
  actions: {
    async load() {
      if (this.items.length) return
      this.loading = true
      try {
        this.items = await fetchJSON<ExperienceItem[]>('/data/experience.json')
      } finally {
        this.loading = false
      }
    }
  }
})