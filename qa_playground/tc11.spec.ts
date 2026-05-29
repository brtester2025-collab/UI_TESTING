import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test.beforeEach('Radio & Checkbox Automation Practice', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.userid || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-dynamic-waits').click();
});

test('TC01: Wait for a delayed browser alert to appear and accept it', async ({
  page,
}) => {
  await page.getByTestId('btn-delayed-alert').click();

  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });
});

test('TC02: Wait for a hidden element to become visible after a delay', async ({
  page,
}) => {
  await page.getByTestId('btn-show-element').click();
  await page.waitForSelector('[data-testid="btn-show-element"]', {
    state: 'visible',
  });
  await expect(page.getByTestId('delayed-element')).toBeVisible();
});

test('TC03: Wait for a disabled button to become enabled', async ({ page }) => {
  const buttons = await page.getByTestId('btn-enable-after-delay');
  await expect(buttons).toBeDisabled();

  await page.getByTestId('btn-activate-trigger').click();
  await expect(buttons).toBeEnabled();
});

test('TC04: Wait for loading text to change to a loaded state', async ({
  page,
}) => {
  await page.getByTestId('btn-load-data').click();
  await expect(page.getByTestId('load-status')).toHaveText('Data Loaded!');
});

test('TC05: Wait for a spinner to disappear before asserting completion', async ({
  page,
}) => {
  const spinners = page.getByTestId('btn-start-spinner');
  spinners.click();

  const rounder = page.getByTestId('spinner');
  await page.waitForSelector('rounder', { state: 'hidden' });
  await expect(rounder).not.toBeVisible();
  await expect(page.getByTestId('spinner-done')).toHaveText(
    'Done! Spinner gone.'
  );
});
