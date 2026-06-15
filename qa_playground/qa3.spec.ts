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

test('TC-ACC-02:Edit account name inline by double-clicking the name cell', async ({
  page,
}) => {
  await page.goto('https://qaplayground.com/bank/accounts');
  await page.waitForTimeout(1000);
  const find = page.getByTestId('account-name').first();

  await expect(find).toHaveAttribute('data-editable', 'true');
  await expect(find).toHaveAttribute('data-editing', 'false');

  const Edit = await page
    .getByRole('link', { name: 'Primary Saving' })
    .dblclick();

  await expect(page.getByTestId('inline-edit-input')).toBeVisible();

  const dropdown = page.getByTestId('');
});

test('TC-ACC-03:Delete an account with confirmation and verify it is removed', async ({
  page,
}) => {
  await page.goto('https://qaplayground.com/bank/accounts');
  const dataDel = page.locator('[data-testid^="delete-account-id_"]');
  await dataDel.first().click();
  page.on('dialog', async (s) => {
    s.accept();
  });
  await expect(page.getByTestId('delete-modal')).toBeVisible();
  await expect(page.getByTestId('delete-message')).toContainText(
    'cannot be undone'
  );
  await page.getByTestId('cancel-delete-button').click();

  page.on('dialog', async (s) => {
    await s.dismiss();
  });

  // await expect(dataDel).toBeVisible();

  const countDel = await dataDel.count();
  console.log(countDel);

  await dataDel.first().click();
  await page.getByTestId('confirm-delete-button').click();
  await expect(page.getByText('Account deleted successfully.')).toBeVisible();
  await expect(dataDel).toHaveCount(countDel - 1);
  console.log(await dataDel.count());
});

test.only('TC-ACC-04:Filter accounts by account type', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank/accounts');
  const Rcount = await page
    .locator('[data-testid="accounts-tbody"] ')
    .locator('tr');
  await page.waitForTimeout(2000);

  const rows3 = page
    .getByTestId('accounts-tbody')
    .locator('[data-testid^="account-row-id_"]');
  console.log(await rows3.count());

  const dataFilter = page.getByTestId('filter-type-select');
  await dataFilter.click();

  await page.getByText('Savings').last().click();
  await page.waitForTimeout(1000);
  await expect(Rcount).toContainText('Saving');
});
