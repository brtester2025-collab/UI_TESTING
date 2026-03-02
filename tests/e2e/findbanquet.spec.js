const { test, expect } = require('@playwright/test')

test('test', async ({ page }) => {
    await page.goto('https://demo-7.com/findbanquet/');
    await page.getByRole('navigation').getByRole('link', { name: 'Mehndi' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Makeup Artist' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Banquet Hall' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Fashion' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Hotels' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Restaurants' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Photographer' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Decorators' }).click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).click();
    await page.getByRole('button', { name: 'Send OTP' }).click();
    await page.getByRole('button', { name: 'Verify & Continue' }).click();
});