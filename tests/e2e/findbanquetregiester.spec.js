const { test, expect } = require('@playwright/test')


test.describe('Register Page', () => {
    test.beforeEach('Home Page', async ({ page }) => {


    });

    test('Create Account page', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
        await page.hover('text= Manage Users')
        await page.click('text=Sign In')
        await expect(page).toHaveURL('https://findbanquet.com/login')
        await page.click('text=Sign up now')
        await expect(page).toHaveURL('https://findbanquet.com/register')
    })

})

