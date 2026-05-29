import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test.beforeEach('Radio & Checkbox Automation Practice', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.userid || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-tabs-windows').click();
});

test('TC01: Open a link in a new tab and switch to it', async ({
  page,
  context,
}) => {
  await page.getByTestId('btn-open-home-tab').click();
  const [newpage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('[data-testid="btn-open-home-tab"]'),
  ]);

  await expect(newpage).toHaveTitle(
    'QA Playground — Practice Selenium, Playwright & Cypress'
  );
});

test('TC02: Open multiple windows and print all window titles', async ({
  page,
  context,
}) => {
  await page.getByTestId('btn-open-multiple-windows').click();
  await expect.poll(() => context.pages().length).toBeGreaterThanOrEqual(2);
  const pages = context.pages();
  for (const p of pages) {
    await p.waitForLoadState();
    console.log(await p.title());
  }
  expect(pages.length).toBeGreaterThanOrEqual(2);
});

test('TC03: Switch back to the parent window after switching to child', async ({
  page,
  context,
}) => {
  const [newpage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('[data-testid="btn-open-home-tab"]'),
  ]);
  await expect(newpage).toHaveTitle(
    'QA Playground — Practice Selenium, Playwright & Cypress'
  );
  await newpage.close();

  await expect(page).toHaveURL(
    'https://qaplayground.com/practice/tabs-windows'
  );

  const pages = context.pages();
  for (let p of pages) {
  }
  expect(pages.length).toBe(1);
});
