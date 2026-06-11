import { test, expect } from '@playwright/test';

test.beforeEach('Dashboard — Test Cases', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank');
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-button').click();
});

test('Accounts Page', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank/accounts');
  expect(new URL(page.url()).pathname).toBe('/bank/accounts');
  page.getByTestId('open-wizard-button').click();
  await expect(page.getByTestId('open-account-wizard')).toBeVisible();
});

test.only('TC-ACC-02:Edit account name inline by double-clicking the name cell', async ({
  page,
}) => {
  await page.goto('https://qaplayground.com/bank/accounts');
  await page.waitForTimeout(1000);

  await page.ge;
});
