const { test, expect } = require('@playwright/test')


test.describe('Register Page', () => {
    test.beforeEach('Home Page', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
        await page.hover('text =Manage Users')
        await page.click('text = Sign in')
        await page.click('text=Sign up now')

    });

    test('Create Account For data visible', async ({ page }) => {
        const firstName = page.getByPlaceholder('Enter first name')
        const LastName = page.getByPlaceholder('Enter last name')

        const MobileNumber = page.getByPlaceholder('Enter 10-digit number')
        const email = page.getByPlaceholder('Enter email address')
        const address = page.getByPlaceholder('Enter your full address')


        await expect(firstName).toBeVisible()
        await expect(LastName).toBeVisible()
        await expect(MobileNumber).toBeVisible()
        await expect(email).toBeVisible()

    })

})

