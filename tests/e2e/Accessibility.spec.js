const { test, expect } = require('@playwright/test')

test.describe('Accessibility UI test', () => {
    test('All the images should have alt text', async ({ page }) => {
        await page.goto('https://www.saucedemo.com')
        await page.locator('#user-name').fill('standard-user')
        await page.locator('#password').fill('secret_sauce')
        await page.locator('#login-button').click();

        const images = page.locator('img')
        const count = await images.count()

        for (let i = 0; i < count; i++) {
            const alt = await images.nth(i).getAttribute('alt')
            expect(alt, `Images ${i} missing alt text`).toBeTruthy()
        }

    })
    test('form inputs should have associated labels or aria labels', async ({ page }) => {
        await page.goto('https://www.saucedemo.com')
        const username = page.locator('#user-name')
        const password = page.locator('#password')

        const userPlaceHolder = await username.getAttribute('placeHolder')
        const passPlaceHolder = await password.getAttribute('placeholder')

        expect(userPlaceHolder).toBeTruthy();
        expect(passPlaceHolder).toBeTruthy();
    })


})