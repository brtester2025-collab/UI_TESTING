const { test, expect, describe } = require('@playwright/test');


test.describe('HomePage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html')
    })

    test('should have correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Swag Labs/);
    })

})