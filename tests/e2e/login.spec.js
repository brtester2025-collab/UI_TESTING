import { test, expect, describe } from '@playwright/test';


test.describe('Login form', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com')
    })

    test('Test to contain all the elements', async ({ page }) => {
        const logo = page.locator('.login_logo')
        const username = page.locator('#user-name')
        const password = page.locator('#password')
        const loginButton = page.locator('#login-button')
        await expect(logo).toBeVisible()
        await expect(username).toBeVisible()
        await expect(password).toBeVisible()
        await expect(loginButton).toBeVisible()
    })

    test('Test for the correct placeholder Test', async ({ page }) => {
        await expect(page.locator('#user-name')).toHaveAttribute('placeholder', 'Username')
        await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Password')
    })

    test('To show username is empty', async ({ page }) => {
        await page.locator('#login-button').click()
        const errorMsg = await page.locator('[data-test="error"]')

        await expect(errorMsg).toBeVisible()
        await expect(errorMsg).toHaveText('Epic sadface: Username is required')
    })

    test('To show password is empty', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user')
        await page.locator('#login-button').click()
        const errorMsg = await page.locator('[data-test="error"]')

        await expect(errorMsg).toBeVisible()
        await expect(errorMsg).toHaveText('Epic sadface: Password is required')
    })



})



