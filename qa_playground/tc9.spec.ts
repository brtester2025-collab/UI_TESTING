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

test.skip('TC03: Verify external link opens in a new tab', async ({ page }) => {
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

test('TC04: Verify internal link stays in the same tab', async ({
  page,
  context,
}) => {
  const links = page.getByTestId('link-internal-home');
  const CountPage = context.pages().length;

  await links.click();
  const href = await links.getAttribute('href');

  const secondPage = context.pages().length;
  await expect(secondPage).toBe(CountPage);
  await expect(page).toHaveURL(new RegExp(`${href}`));
});
// test('', async ({ page }) => {});
// test('', async ({ page }) => {});
// test('', async ({ page }) => {});
// test('', async ({ page }) => {});
/*


*/
