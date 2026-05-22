import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test.beforeEach('Radio & Checkbox Automation Practice', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.userid || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('card-link-date-picker').click();
});

test("TC01: Fill today's date in the date input and verify the value", async ({
  page,
}) => {
  await page.getByTestId('input-today-date').fill('2026-05-22');
  await expect(page.getByTestId('input-today-date')).toHaveValue('2026-05-22');
});

test('TC02: Enter a birthday date and assert the value is stored', async ({
  page,
}) => {
  await page.getByTestId('input-birthday').fill('2003-01-01');
  await expect(page.getByTestId('input-birthday')).toHaveValue('11-01-2001');
});
