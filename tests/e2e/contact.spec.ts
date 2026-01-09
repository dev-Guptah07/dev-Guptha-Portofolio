import { test, expect } from '@playwright/test'

test('contact section renders', async ({ page }) => {
  await page.goto('/')
  const section = page.locator('#contact')
  await expect(section).toBeVisible()
  await section.screenshot({ path: 'tests/e2e/screenshots/contact.png' })
})
