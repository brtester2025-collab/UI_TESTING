import { expect, test } from '@playwright/test';

test.beforeEach('Dropdown Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('card-link-data-table').click();
});

test('TC01: Verify all table column headers are present // for checking the count in the table', async ({
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

test('to check all header', async ({ page }) => {
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

test('TC02: Count the total number of rows in the data table', async ({
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

test('TC04: Find a book row by author name using XPath or filter', async ({
  page,
}) => {
  await page.waitForSelector('[data-testid="books-table"]');
  const authName = await page
    .locator('#books-table tbody tr:first-child td:nth-child(4)')
    .innerText();

  const cleanName = authName?.trim();

  const matchRow = await page
    .locator('#books-table tbody tr')
    .filter({ hasText: cleanName });
  console.log(authName);
  await expect(matchRow).toBeVisible();
  await expect(matchRow).toHaveCount(1);
});

test('TC05: Verify the table is not empty after page load', async ({
  page,
}) => {
  await page.waitForSelector('[data-testid="books-table"]');
  const data = page.locator('tbody tr').first();
  await expect(data).toBeVisible();
  // how to extract the data ?
  await expect(page.locator('tbody tr').first()).toBeVisible();
  expect(await data.count()).toBeGreaterThan(1);
});

test('TC06: Assert the ISBN column contains only string values', async ({
  page,
}) => {
  await page.waitForSelector('[data-testid="table-row-1"]');
  const count = await page
    .locator('#books-table tbody tr:first-child td:nth-child(5)')
    .allInnerTexts();

  console.log(await page.locator('#books-table').count());
  console.log(await page.locator('#books-table tr').count());
  console.log(count);

  for (let i of count) {
    expect(i.trim()).not.toBe(' ');
  }
});
