const { test, expect, describe } = require('@playwright/test')

test.describe("responsive", () => {

    test('login page visual snapshot', async ({ page }) => {
        await page.goto('https://www.saucedemo.com')
        await expect(page).toHaveScreenshot('login-page.png', {
            maxDiffPixelRatio: 0.05,
        })

    })

    test('should be responsive on mobile port', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.goto('https://www.saucedemo.com')
        await expect(page.locator('#login-button')).toBeVisible()
        await expect(page.locator('#user-name')).toBeVisible()
    })

    test('should be responsive on table port', async ({ page }) => {
        await page.setViewportSize({ width: 810, height: 1080 })
        await page.goto('https://www.saucedemo.com')
        await expect(page.locator('#login-button')).toBeVisible()

    })
    test('should be responsive on laptop port', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 })
        await page.goto('https://www.saucedemo.com')
        await expect(page.locator('#login-button')).toBeVisible()

    })


    // page performance

    test('page should load within 5 sec', async ({ page }) => {
        const startTime = Date.now()
        await page.goto('https://www.saucedemo.com')
        const loadTime = Date.now() - startTime

        expect(loadTime).toBeLessThan(5000)

    })

})

