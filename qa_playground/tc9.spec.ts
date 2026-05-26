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

test.skip('TC04: Verify internal link stays in the same tab', async ({
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
test.skip('TC05: Verify broken link returns HTTP error status', async ({
  page,
  request,
}) => {
  const brokenLink = await page.getByTestId('link-image-ironman');
  const newBroke = await page.getByTestId('link-image-broken');
  const href2 = await newBroke.getAttribute('href');
  const fullUrl = new URL(href2!, page.url()).toString();
  const response2 = await request.get(fullUrl!);
  expect([404, 200, 500, 400]).toContain(response2.status());

  const href = await brokenLink.getAttribute('href');
  console.log(typeof href);
  await brokenLink.click();
  await expect(href).not.toBeNull();
  const response = await request.get(href!);
  expect([404, 200, 500, 400]).toContain(response.status());
  console.log(response.status());
});
test('TC06: Verify link is keyboard accessible', async ({ page }) => {
  const homeLink = page.getByRole('link', { name: 'Home' });
  await homeLink.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('https://qaplayground.com/');
});
// test('', async ({ page }) => {});
// test('', async ({ page }) => {});
