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

    test('To have the price tag of dollar', async ({ page }) => {
        const prices = await page.locator('.inventory_item_price').allTextContents()
        prices.forEach((price) => {
            expect(price).toMatch(/^\$\d+\.\d{2}$/)
        })
    })

    test('Sorting of price from low to high', async ({ page }) => {

        await page.locator('[data-test= "product-sort-container"]').selectOption('lohi')
        const price = await page.locator('.inventory_item_price').allTextContents()
        const numericPrice = price.map(p => parseFloat(p.replace('$', '')))

        for (let i = 0; i < numericPrice.length - 1; i++) {
            expect(numericPrice[i]).toBeLessThanOrEqual(numericPrice[i + 1])
        }
    })

    test('Sorting the price from high to low', async ({ page }) => {
        await page.locator('[data-test ="product-sort-container"]').selectOption('hilo')
        const price = await page.locator('.inventory_item_price').allTextContents()
        const numericPrice = price.map(p => parseFloat(p.replace('$', '')))

        for (let i = 0; i < numericPrice.length - 1; i++) {
            expect(numericPrice[i]).toBeGreaterThanOrEqual(numericPrice[i + 1])
        }
    })

    test('Sort the product A-Z', async ({ page }) => {
        await page.locator('[data-test ="product-sort-container"]').selectOption('az')
        const names = await page.locator('.inventory_item_name').allTextContents()
        const sort = [...names].sort();
        expect(names).toEqual(sort)
    })

    test('To add the multiple products and check the cart count', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()


        await expect(page.locator('.shopping_cart_badge')).toHaveText('3')
    })

    test('Cart badge is not visible when no product is added to the cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible()

    })



})