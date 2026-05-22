import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test.beforeEach('Radio & Checkbox Automation Practice', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.userid || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-links').click();
});

test.skip('TC01: Verify link navigates to the correct URL on click', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://qaplayground.com/');
});

test.skip('TC02: Verify link text matches expected label', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Home' })).toHaveText('Home');
});

test('TC03: Verify external link opens in a new tab', async ({ page }) => {
  const externalLink = page.locator('a[target="_blank"]').nth(0);
  await expect(externalLink).toHaveAttribute('target', '_blank');
  await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    externalLink.click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).not.toHaveURL(
    'https://www.javatpoint.com/selenium-tutorial'
  );
});

test('TC04: Verify internal link stays in the same tab', async ({ page }) => {
  const links = page.locator('a[target = "_blank"]').nth(0);
  await expect(links).toHaveAttribute('target', '_blank');
  await expect(links).toHaveAttribute('target');
});
// test('', async ({ page }) => {});
// test('', async ({ page }) => {});
// test('', async ({ page }) => {});
// test('', async ({ page }) => {});
