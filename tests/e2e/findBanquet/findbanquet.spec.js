const { test, expect } = require('@playwright/test')


test.describe('Find banquet', () => {
    test('Home Page', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
        await expect(page).toHaveURL('https://findbanquet.com/')
        await page.getByText('Anchors').click()
        await expect(page).toHaveURL('https://findbanquet.com/vendors/anchors')
    });

    test('login page for user', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
        await page.hover('text =Manage Users')
        await page.click('text = Sign in')
        await expect(page).toHaveURL('https://findbanquet.com/login')
        await page.click('text = Sign up now')
        await expect(page).toHaveURL('https://findbanquet.com/register')
    })

})

