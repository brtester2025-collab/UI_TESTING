import { expect, test } from '@playwright/test';

test.beforeEach('Dropdown Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('card-link-data-table').click();
});

test.skip('TC01: Verify all table column headers are present // for checking the count in the table', async ({
  page,
}) => {
  await page.waitForSelector('[data-testid="books-table"]');

  const tables = page.getByTestId('books-table');
  await page.waitForSelector('[data-testid="table-row-1"]');

  const rowCount = await tables.locator('tbody tr').count();
  const colCount = await tables.locator('thead th').count();

  console.log('Rows:', rowCount);
  console.log('Columns:', colCount);
});

test.skip('to check all header', async ({ page }) => {
  await page.waitForSelector('[data-testid="books-table"]');
  const data = await page.locator('#books-table thead th').allTextContents();
  //   console.log(data);
  expect(data.length).toBe(6);
  expect(data).toEqual([
    'Sr No.',
    'Book Name',
    'Book Genre',
    'Book Author',
    'Book ISBN',
    'Book Published',
  ]);
});

test.skip('TC02: Count the total number of rows in the data table', async ({
  page,
}) => {
  const table = page.getByTestId('books-table');
  await page.waitForSelector('[data-testid="table-row-1"]');
  const rows = await table.locator('tbody tr').count();
  console.log('Rows: ', rows);
  expect(rows).toBe(10);
});

test('TC03: Read a cell value from a specific row and column', async ({
  page,
}) => {
  await page.waitForSelector('[data-testid="books-table"]');
  //   await page.waitForSelector('[data-testid="table-row-1"]');
  const containText = await page
    .locator('#books-table  tbody tr:nth-child(1) td:nth-child(4)')
    .textContent();
  console.log('cell value: ', containText);
});
