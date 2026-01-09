import { defineStore } from 'pinia'
import { fetchJSON } from '../services/api'

export interface ProfileState {
  title: string
  yearsExperience: number
  bio: string[]
  profilePic: string
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    title: '',
    yearsExperience: 0,
    bio: [],
    profilePic: ''
  }),
  actions: {
    async load() {
      const data = await fetchJSON<ProfileState>('/data/about.json')
      this.title = data.title
      this.yearsExperience = data.yearsExperience
      this.bio = data.bio
      this.profilePic = data.profilePic
    }
  }
})