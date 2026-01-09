import { test, expect } from '@playwright/test'

test('about section renders', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#about')
  await expect(section).toBeVisible()
  await section.screenshot({ path: 'tests/e2e/screenshots/about.png' })
})
