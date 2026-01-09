import { defineStore } from 'pinia'
import { fetchJSON } from '../services/api'

export interface SiteState { siteName: string; tagline?: string }

export const useSiteStore = defineStore('site', {
  state: (): SiteState => ({ siteName: '', tagline: '' }),
  actions: {
    async load() {
      const data = await fetchJSON<SiteState>('/data/site.json')
      this.siteName = data.siteName
      this.tagline = data.tagline
    }
  }
})