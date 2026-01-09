import { test, expect } from '@playwright/test'

test('projects section renders', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#projects')
  await expect(section).toBeVisible()
  await section.screenshot({ path: 'tests/e2e/screenshots/projects.png' })
})
