import { test, expect } from '@playwright/test';

test.beforeEach('Dashboard — Test Cases', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank');
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-button').click();
});

test('TC-DASH-01:Skeleton loading state appears on page load then data renders', async ({
  page,
}) => {
  await expect(page).toHaveURL('https://qaplayground.com/bank/dashboard');
  await expect(page.locator('#dashboard-page-container')).toHaveAttribute(
    'data-loading',
    'true'
  );
  const visible = await page.getByTestId('skeleton-card');
  console.log(visible);

  const counts = await visible.count();
  await expect(visible.first()).toBeVisible();
  await expect(counts).toBeGreaterThan(0);

  await expect(page.locator('#dashboard-page-container')).toHaveAttribute(
    'data-loading',
    'false',
    { timeout: 2000 }
  );

  await expect(page.getByTestId('total-balance-card')).toBeVisible();
  await expect(page.getByTestId('total-balance-card')).toContainText('$');
  await expect(page.getByTestId('accounts-count-card')).toBeVisible();

  await expect(page.getByTestId('accounts-count-card')).toHaveText(/\d+/);

  await expect(page.getByTestId('transactions-count-card')).toBeVisible();
  await expect(page.getByTestId('transactions-count-card')).toHaveText(/\d+/);
});

test('TC-DASH-02:Stat card values match actual account and transaction data', async ({
  page,
}) => {
  await expect(page.locator('#dashboard-page-container')).toHaveAttribute(
    'data-loading',
    'false'
  );

  const data = await page.getByTestId('total-balance').textContent();
  console.log(data);

  await page.goto('https://qaplayground.com/bank/accounts');
  await expect(page.getByTestId('account-balance').first()).toBeVisible();

  const sum = await page.getByTestId('account-balance').count();
  console.log(sum);

  const count = await page.getByTestId('account-balance').count();
  console.log('Count:', count);

  const texts = await page.getByTestId('account-balance').allTextContents();
  console.log('Texts:', texts);

  let total = 0;
  for (let i of texts) {
    total += Number(i?.replace(/[$,]/g, ''));
  }
  console.log('Total: ', total);
  expect(total).toBe(7500);

  const active = await page.getByTestId('summary-total-accounts').textContent();
  console.log(active);

  await page.goto('https://qaplayground.com/bank/dashboard');

  await page.waitForTimeout(3000);

  await expect(page.getByTestId('accounts-count')).toBeVisible();
  const user = await page.getByTestId('accounts-count').textContent();
  console.log(user);

  await expect(active).toBe(user);
});

test('TC-DASH-03:Quick Actions navigate to correct pages', async ({ page }) => {
  const clicker = page.getByTestId('quick-add-account');
  await clicker.click();
  await expect(page).toHaveURL(
    'https://qaplayground.com/bank/accounts?action=add'
  );
  expect(new URL(page.url()).pathname).toBe('/bank/accounts');
  await expect(page.getByTestId('account-modal')).toBeVisible();
  await page.goto('https://qaplayground.com/bank/dashboard');
  await page.waitForTimeout(3000);
  const clicker2 = page.getByTestId('quick-new-transaction');
  await clicker2.click();
  await page.waitForTimeout(3000);

  await expect(new URL(page.url()).pathname).toBe('/bank/transactions');
});

test('TC-DASH-04:Recent Transactions table shows up to 5 latest transactions', async ({
  page,
}) => {
  await page.getByTestId('recent-transactions-table');
  await page.locator("[id^='recent-transaction-row-id_']").waitFor();
  const data = await page.getByTestId('transactions-tbody').locator('tr');
  const counter = await data.count();
  console.log(counter);
  expect(counter).toBeGreaterThanOrEqual(0);
  expect(counter).toBeLessThanOrEqual(5);

  for (let i = 0; i < counter; i++) {
    const map = data.nth(i).locator('td');
    expect(map.nth(0)).not.toBeEmpty();
    expect(map.nth(1)).not.toBeEmpty();
    expect(map.nth(2)).not.toBeEmpty();
    expect(map.nth(3)).not.toBeEmpty();
    expect(map.nth(4)).not.toBeEmpty();
  }

  const header = ['Date', 'Type', 'Account', 'Amount', 'Status'];
  await expect(page.locator('#recent-transactions-header th')).toHaveText(
    header
  );

  for (let i = 0; i < counter; i++) {
    await expect(data.nth(i).locator('td').nth(4)).toContainText('Completed');
  }
});

test.only('TC-DASH-05:Pinned Accounts section supports drag-and-drop reorder', async ({
  page,
}) => {
  const load = await page.locator('[data-testid^="draggable-account-"]');

  await load.first().waitFor();

  const data = await page
    .locator('[data-testid^="draggable-account-"]')
    .first();
  const count = await load.count();
  console.log(count);

  expect(count).toBeGreaterThan(0);

  await expect(data).toHaveAttribute('draggable', 'true');

  const first = load.nth(0);

  const second = load.nth(1);
  console.log(second);

  const textforFirst = await first.textContent();
  console.log(textforFirst);

  await first.dragTo(second);
});
