import { defineStore } from 'pinia'
import { fetchJSON } from '../services/api'

export interface NavItem { id: string; label: string }

export const useNavStore = defineStore('nav', {
  state: () => ({ items: [] as NavItem[] }),
  actions: {
    async load() {
      this.items = await fetchJSON<NavItem[]>('/data/nav.json')
    }
  }
})
