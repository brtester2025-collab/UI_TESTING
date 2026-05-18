import { expect, test } from '@playwright/test';

test.beforeEach('Dropdown Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('card-link-data-table').click();
});

test('TC01: Verify all table column headers are present', async ({ page }) => {
  await page.waitForSelector('[data-testid="books-table"]');

  const tables = page.getByTestId('books-table');
  await page.waitForSelector('[data-testid="table-row-1"]');
  const rowCount = await tables.locator('tbody tr').count();

  const colCount = await tables.locator('thead th').count();

  console.log('Rows:', rowCount);
  console.log('Columns:', colCount);
});
