const { test, expect } = require('@playwright/test');



test.describe('Product Page', () => {

    test.beforeEach('Login Click', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.locator('#user-name').fill('standard_user')
        await page.locator('#password').fill('secret_sauce')
        await page.locator('#login-button').click()
        await page.waitForURL(/inventory/)

    })

    test('Checking the Product count', async ({ page }) => {
        const countItems = page.locator('.inventory_item')
        await expect(countItems).toHaveCount(6)

    })

    test('checking the product has price,image and description', async ({ page }) => {

        const firstProduct = await page.locator('.inventory_item').first()
        await expect(firstProduct.locator('img.inventory_item_img')).toBeVisible()
        await expect(firstProduct.locator('.inventory_item_description')).toBeVisible()
        await expect(firstProduct.locator('.inventory_item_name ')).toBeVisible()
        await expect(firstProduct.locator('.inventory_item_price')).toBeVisible()
    })



})