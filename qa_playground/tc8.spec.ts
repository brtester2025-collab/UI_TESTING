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

test.skip("TC01: Fill today's date in the date input and verify the value", async ({
  page,
}) => {
  await page.getByTestId('input-today-date').fill('2026-05-22');
  await expect(page.getByTestId('input-today-date')).toHaveValue('2026-05-22');
});

test.skip('TC02: Enter a birthday date and assert the value is stored', async ({
  page,
}) => {
  await page.getByTestId('input-birthday').fill('2003-01-01');
  await expect(page.getByTestId('input-birthday')).toHaveValue('2003-01-01');
});

test.skip('TC03: Fill a date range — start date and end date', async ({
  page,
}) => {
  await page.getByTestId('input-date-start').fill('2020-10-10');
  await page.getByTestId('input-date-end').fill('2020-12-10');
  await expect(page.getByTestId('input-date-start')).toHaveValue('2020-10-10');
  await expect(page.getByTestId('input-date-end')).toHaveValue('2020-12-10');
});

test("TC04: Verify date input rejects out-of-range date (min/max constraint)'", async ({
  page,
}) => {
  const date = await page.getByTestId('input-date-restricted');

  await expect(date).toHaveAttribute('min', '2024-01-01');
  await date.fill('2025-01-01');
  const isValid = await date.evaluate((el: HTMLInputElement) =>
    el.checkValidity()
  );
  expect(isValid).toBeFalsy();

  await expect(date).toHaveAttribute('max', '2024-12-31');
  await date.fill('2024-01-01');
  const isValidate = await date.evaluate((el: HTMLInputElement) =>
    el.checkValidity()
  );
  expect(isValidate).toBeTruthy();
});
