import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectsStore } from '../../src/stores/useProjectsStore'
import fs from 'fs'
import path from 'path'

describe('projects store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads projects from data file', async () => {
    const json = fs.readFileSync(path.resolve(process.cwd(), 'public/data/projects.json'), 'utf8')
    const projects = JSON.parse(json)

    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(projects) })) as any

    const store = useProjectsStore()
    await store.load()

    expect(store.items.length).toBeGreaterThan(0)
    expect(store.items[0]).toHaveProperty('title')
  })
})
