import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';

test.beforeEach('Button Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('card-link-buttons').click();
});

test.skip('TC01: Verify button is clickable and triggers action', async ({
  page,
}) => {
  await page.getByTestId('btn-goto-home').click();
  await expect(page.locator('#main-content')).toBeVisible();
});

test.skip('TC02: Verify button displays the correct label text', async ({
  page,
}) => {
  await page.getByTestId('btn-goto-home');
  await expect(page.locator('#btn-goto-home')).toContainText('Go To Home');
});

test.skip('TC03: Verify button triggers the correct action on click', async ({
  page,
}) => {
  const buttons = await page.getByTestId('btn-goto-home');
  await buttons.click();
  await expect(page).toHaveURL('https://www.qaplayground.com/');
});

test.skip('TC04: Verify double-click button triggers double-click action', async ({
  page,
}) => {
  const buttons = await page.getByTestId('btn-double-click').dblclick();
  await expect(page.locator('btn-double-click')).toContainText(
    'Double Click Me'
  );
});

test.skip('TC05: Verify right-click button triggers context menu action', async ({
  page,
}) => {
  const button = await page
    .getByTestId('btn-right-click')
    .click({ button: 'right' });
  await expect(page.locator('#btn-action-result')).toContainText(
    'You Right-clicked on button!'
  );
});

test.skip('TC06: Verify disabled button cannot be clicked', async ({
  page,
}) => {
  await expect(page.locator('#btn-disabled')).toBeDisabled();
  const button = await page.locator('#btn-disabled');
  await button.click({ force: true });
  await expect(page).toHaveURL('https://www.qaplayground.com/practice/buttons');
});
test.skip('TC07: Verify button is enabled when it should be', async ({
  page,
}) => {
  const buttons = await page.locator('#btn-right-click');
  await expect(buttons).toBeEnabled();
  await buttons.click({ button: 'right' });
  await expect(page.locator('#btn-action-result')).toHaveText(
    'You Right-clicked on button!'
  );
});
test.skip('TC08: Verify button is responsive on different screen sizes', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 440 });
  const buttons = await page.locator('#btn-goto-home');
  const box = await buttons.boundingBox();
  expect(box).not.toBeNull();

  expect(box?.x).toBeGreaterThanOrEqual(0);
  expect(box?.y).toBeGreaterThanOrEqual(0);
  // expect(box?.width + box?.x).toBeLessThanOrEqual(375);
  expect(box.x + box.width).toBeLessThanOrEqual(375);
  expect(box.y + box.height).toBeLessThanOrEqual(440);
  await buttons.click();
  await expect(page).toHaveURL('https://www.qaplayground.com/');
});
test.skip('TC09: Verify button is accessible via keyboard', async ({
  page,
}) => {
  await page.keyboard.press('Tab');
  await page.locator('#btn-goto-home').press('Enter');
  await expect(page).toHaveURL('https://www.qaplayground.com/');
});
test.skip('TC10: Verify button is accessible to screen readers', async ({
  page,
}) => {
  // 2. Get all button-like elements
  const buttons = page.locator('button, [role="button"]');
  const count = await buttons.count();

  // Safety check
  expect(count).toBeGreaterThan(0);

  // 3. Loop through each button
  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i);

    // --- Check label ---
    const text = await btn.textContent();
    const ariaLabel = await btn.getAttribute('aria-label');

    expect(
      (text && text.trim().length > 0) ||
        (ariaLabel && ariaLabel.trim().length > 0)
    ).toBeTruthy();

    // --- Check role or native button ---
    const tagName = await btn.evaluate((el) => el.tagName.toLowerCase());
    const role = await btn.getAttribute('role');

    const isNativeButton = tagName === 'button';
    const hasButtonRole = role === 'button';

    expect(isNativeButton || hasButtonRole).toBeTruthy();
  }
});

test('to check the button  test', async ({ page }) => {
  const buttons = await page.locator('button , [role = button]');
  const btncnt = await buttons.count();

  expect(btncnt).toBeGreaterThan(0);

  for (let i = 0; i < btncnt; i++) {
    const bot = buttons.nth(i);

    const text = await bot.textContent();
    const arailable = await bot.getAttribute('aria-label');

    expect(
      (text && text?.length > 0) || (arailable && arailable?.trim().length > 0)
    ).toBeTruthy();
    const text1 = await bot.getAttribute('role');
    const text2 = await bot.evaluate((el) => el.tagName.toLowerCase());
    expect(text1 || text2).toBeTruthy();
  }
});
