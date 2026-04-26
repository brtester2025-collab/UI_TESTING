import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
await page.goto('https://findbanquet.com/');
  await page.getByRole('link', { name: 'All', exact: true }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Mehendi' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Makeup Artist' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Banquet Hall' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Fashion' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Resort' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Hotels' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Restaurants' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Photographer' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Decorators' }).click();
  await page.getByRole('banner').getByRole('button', { name: 'User Sign In' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('000000000');
  await page.getByRole('button', { name: 'Send OTP' }).click();
  await page.getByRole('textbox', { name: 'Enter Verification Code Enter' }).click();
  await page.getByRole('textbox', { name: 'Enter Verification Code Enter' }).fill('0000');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();
  await page.getByRole('banner').getByRole('button', { name: 'Chat Now' }).click();
  await page.locator('app-chat').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('banner').getByRole('button', { name: 'List Your Business FREE' }).click();
  await page.getByRole('banner').getByRole('button').filter({ hasText: /^$/ }).click();
});