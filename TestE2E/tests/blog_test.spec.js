const { test, expect } = require('@playwright/test')
test('La página se abre correctamente ', async ({ page }) => {
    await page.goto('http://localhost:5173')
  
    const locator = await page.getByText('Mi lista de blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('La vida es maravillosa')).toBeVisible()
  })