import { defineStore } from 'pinia'
import { fetchJSON } from '../services/api'

export interface TechCategory { title: string; technologies: Array<{ name: string; level: string; icon?: string }> }

export const useTechStore = defineStore('tech', {
  state: () => ({ categories: [] as TechCategory[] }),
  actions: {
    async load() {
      this.categories = await fetchJSON<TechCategory[]>('/data/tech.json')
    }
  }
})