const { test, expect } = require('@playwright/test');



test.describe('Product Page', () => {

    test.beforeEach('Login Click', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.locator('#user-name').fill('standard_user')
        await page.locator('#password').fill('secret_sauce')
        await page.locator('#login-button').click()
        await page.waitForURL(/inventory/)

    })

    test('Checking the inventory count', async ({ page }) => {
        const countItems = page.locator('#inventory_item')

        await expect(countItems).toHaveCount(0)

    })



})