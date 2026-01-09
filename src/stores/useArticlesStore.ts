import { defineStore } from 'pinia'
import { fetchJSON } from '../services/api'

export interface Article { title: string; excerpt: string; date: string; readTime: string; category: string ; link : string }

export const useArticlesStore = defineStore('articles', {
  state: () => ({ items: [] as Article[], loading: false }),
  actions: {
    async load() {
      if (this.items.length) return
      this.loading = true
      try {
        this.items = await fetchJSON<Article[]>('/data/articles.json')
      } finally {
        this.loading = false
      }
    }
  }
})