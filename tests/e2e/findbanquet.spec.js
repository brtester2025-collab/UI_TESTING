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
        await page.getByRole('button', { name: 'Manage Users' }).click()
        await expect(page).toHaveURL('https://findbanquet.com/login')
        await page.getByRole('button', { name: 'Sign up now' }).click()
        await expect(page).toHaveURL('https://findbanquet.com/register')
    })

    test('user registration for Vendor', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
    })

})

