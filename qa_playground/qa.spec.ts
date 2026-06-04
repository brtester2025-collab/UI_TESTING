import { test, expect } from '@playwright/test';

test.beforeEach('Bank Automation', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank');
});

test('TC-LOGIN-01:Successful login with admin credentials', async ({
  page,
}) => {
  await page.getByTestId('username-input').fill('viewer');
  await page.getByTestId('password-input').fill('viewer123');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
});

test('TC-LOGIN-02:Failed login shows error alert for invalid credentials', async ({
  page,
}) => {
  await page.getByTestId('username-input').fill('test');
  await page.getByTestId('password-input').fill('testewer123');
  await page.getByTestId('login-button').click();
  await expect(page.locator('#alert-message')).toContainText(
    'Invalid username or password. Please try again.'
  );
});

test('TC-LOGIN-03:Toggle password visibility hides and reveals password text', async ({
  page,
}) => {
  const data = await page.getByTestId('password-input');
  await expect(data).toHaveAttribute('type', 'password');
  console.log(await data.getAttribute('type'));

  const clicked = await page.getByTestId('toggle-password-btn');

  await clicked.click();
  console.log(await clicked.count());
  console.log(await data.getAttribute('type'));
  await expect(data).toHaveAttribute('type', 'text');
});

test('TC-LOGIN-04:Pressing Enter in the password field submits the login form', async ({
  page,
}) => {
  await page.getByTestId('username-input').fill('viewer');
  await page.getByTestId('password-input').fill('viewer123');

  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
});

test.only('TC-LOGIN-05:Read-only viewer login grants restricted access', async ({
  page,
}) => {
  await page.getByTestId('username-input').fill('viewer');
  await page.getByTestId('password-input').fill('viewer123');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('viewer-badge')).toBeVisible();
  await expect(page.getByTestId('viewer-badge')).toHaveText('Read-only');

  await expect(page.getByTestId('role-indicator')).toContainText(
    'Read-only Viewer'
  );

  const button = page.getByTestId('nav-accounts');
  await button.click();
  await expect(page).toHaveURL('https://qaplayground.com/bank/accounts');
});
