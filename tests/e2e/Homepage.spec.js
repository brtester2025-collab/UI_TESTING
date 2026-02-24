import { test, expect } from '@playwright/test';


test.describe('HomePage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })
})