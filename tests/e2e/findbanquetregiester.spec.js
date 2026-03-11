const { test, expect } = require('@playwright/test')


test.describe('Register Page', () => {
    test.beforeEach('Home Page', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
        await page.getByRole('button', { name: 'Sign up now' }).click()
        await page.getByRole('button', { name: 'Manage Users' }).click()
    });





})

