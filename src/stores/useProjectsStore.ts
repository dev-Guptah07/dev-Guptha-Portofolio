import { defineStore } from 'pinia'
import { fetchJSON } from '../services/api'

export interface Project { title: string; description: string; technologies: string[]; link: string; github: string }

export const useProjectsStore = defineStore('projects', {
  state: () => ({ items: [] as Project[], loading: false }),
  actions: {
    async load() {
      if (this.items.length) return // cached
      this.loading = true
      try {
        this.items = await fetchJSON<Project[]>('/data/projects.json')
      } finally {
        this.loading = false
      }
    }
  }
})