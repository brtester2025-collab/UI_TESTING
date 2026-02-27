const { test, expect, describe } = require('@playwright/test')

test.describe('checkout page', () => {
    test.beforeEach('checking out', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await page.locator('#user-name').fill('standard_user')
        await page.locator('#password').fill('secret_sauce')
        await page.locator('#login-button').click()

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();

    })


    test('should display cart item correctly', async ({ page }) => {
        await expect(page.locator('.cart_item')).toHaveCount(1);
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
        await expect(page.locator('.cart_quantity')).toHaveText('1');
    });

    test('should remove item from cart page', async ({ page }) => {
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('.cart_item')).toHaveCount(0);
    });

    test('should continue shopping from cart', async ({ page }) => {
        await page.locator('[data-test="continue-shopping"]').click();
        await expect(page).toHaveURL(/inventory/);
    });

    test('Cart Checkout page', async ({ page }) => {

        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL(/checkout-step-one/)

    })

    test('show the error for the empty field', async ({ page }) => {
        // await page.locator('[data-test="checkout"]').click()
        await page.locator('[data-test="continue"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required')
    })



})







