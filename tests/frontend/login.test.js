import { test, expect, describe } from '@playwright/test';


describe('Swagger Login Authentication', () => {


    test.beforeEach('should login successfully and verify URL', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page).toHaveURL(/inventory/);


    });

    test('to have the text for the product page', async ({ page }) => {
        await expect(page.locator('.title')).toHaveText('Products')

    })

    test('to check the product page', async ({ page }) => {
        const addtoCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        const cartCount = page.locator('[data-test="shopping-cart-badge"]')
        await addtoCart.click()
        await expect(cartCount).toHaveText('1')
        await addtoCart.click()
        await expect(cartCount).toHaveText('2')
    })



})



