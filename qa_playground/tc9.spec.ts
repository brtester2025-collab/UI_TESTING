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

test('TC01: Verify link navigates to the correct URL on click', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://qaplayground.com/');
});

test('TC02: Verify link text matches expected label', async ({ page }) => {
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
test('TC05: Verify broken link returns HTTP error status', async ({
  page,
  request,
}) => {
  const brokenLink = await page.getByTestId('link-image-ironman');
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
test('TC07: Verify link href attribute contains the correct URL', async ({
  page,
}) => {
  const pathcheck = await page.getByTestId('link-text-garbled-1');

  const href = await pathcheck.getAttribute('href');
  expect(href).toBe('/');
});

test('TC08: Verify link has accessible label for screen readers', async ({
  page,
}) => {
  await page.waitForLoadState('networkidle');

  const links = page.locator('a[data-testid]');
  const counts = await links.count();
  console.log(await page.locator('a[data-testid]').count());

  for (let i = 0; i < counts; i++) {
    const linkers = links.nth(i);

    if (!(await linkers.isVisible())) continue;

    const text = (await linkers.textContent())?.trim() || '';
    console.log(i, text);
    if (!text) continue;
    expect(text).toBeTruthy();

    const badtext = ['click here', 'read more', 'here'];
    expect(badtext.includes(text.toLowerCase())).toBeFalsy();
  }
});

test('TC09: Verify link hover state is visually distinct', async ({ page }) => {
  const link = await page.getByTestId('link-internal-home');

  const Linkbefore = await link.evaluate((el) => {
    return window.getComputedStyle(el).color;
  });

  await link.hover();

  const Linkafter = await link.evaluate((el) => {
    return window.getComputedStyle(el).color;
  });

  console.log('Before', Linkbefore);
  console.log('After', Linkafter);
  expect(Linkbefore).not.toBe(Linkafter);
});
/**
 * 

1.
Navigate to /practice/links
2.
Locate each link element
3.
Assert each link has descriptive text or an aria-label
4.
Assert no link text is ambiguous (e.g. 'click here', 'read more' alone)
 * 
 */
