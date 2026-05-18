import { expect, test } from '@playwright/test';

test.beforeEach('Dropdown Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-dropdowns').click();
});

test.skip('TC01: Select "APPLE" from fruit dropdown by visible text', async ({
  page,
}) => {
  await page.getByTestId('dropdown-fruit').click();
  await page.getByRole('option', { name: 'Apple' }).click();
  await expect(page.locator('#dropdown-fruit')).toHaveText('Apple');
});

test.skip('TC02: Select "India" from country dropdown by value attribute', async ({
  page,
}) => {
  await page.getByTestId('dropdown-country').click();
  await page.getByRole('option', { name: 'India' }).click();
  await expect(page.locator('#dropdown-country')).toHaveText('India');
});

test.skip('to check the total count of', async ({ page }) => {
  await page.getByTestId('dropdown-fruit').click();
  const values = await page.getByRole('option').allTextContents();
  const counts = await page.getByRole('option').count();
  console.log(values);
  console.log(counts);
});

test.skip('TC04: Get all available options from the programming language dropdown', async ({
  page,
}) => {
  await page.getByTestId('dropdown-language').click();
  const data = await page.getByRole('option').allTextContents();
  console.log(data);
});

test.skip('TC05: Select the last option from the programming language dropdown', async ({
  page,
}) => {
  await page.getByTestId('dropdown-language').click();
  const opts = page.getByRole('option');
  const count = await opts.count();
  await opts.nth(count - 1).click();
  await expect(page.getByTestId('dropdown-language')).toContainText(
    'JavaScript'
  );
});

test.skip('TC06: CTRL + click multi-select', async ({ page }) => {
  const dropdown = page.getByTestId('dropdown-heroes');

  const aquaman = dropdown.locator('option', {
    hasText: 'Aquaman',
  });

  const batman = dropdown.locator('option', {
    hasText: 'Batman',
  });

  await page.keyboard.down('Control');
  await aquaman.click();
  await batman.click();
  await page.keyboard.up('Control');

  const selected = await dropdown.locator('option:checked').allTextContents();
  expect(selected).toEqual(expect.arrayContaining(['Aquaman', 'Batman']));
});

test('TC for other dropdown Option', async ({ page }) => {
  const dropdown = page.getByTestId('dropdown-heroes');

  const antman = dropdown.locator('option', { hasText: 'Ant-man' });
  const batman = dropdown.locator('option', { hasText: 'batman' });

  await page.keyboard.down('Control');
  await antman.click();
  await batman.click();
  // await page.keyboard.up('Control');

  const select = await dropdown.locator('option:checked').allTextContents();
  expect(select).toEqual(expect.arrayContaining(['Ant-Man', 'Batman']));
});
test('TC07: Multi-select: deselect a previously selected option', async ({
  page,
}) => {
  const previous = page.getByTestId('dropdown-heroes');
  const antman = previous.locator('option', { hasText: 'Ant-man' });
  const batman = previous.locator('option', { hasText: 'batman' });
  await page.keyboard.down('Control');
  await antman.click();
  await batman.click();

  await page.keyboard.up('Control');
  await antman.click();

  const select = await previous.locator('option:checked').allTextContents();
  expect(select).toEqual(expect.arrayContaining(['Ant-Man']));
});

test('TC10: Verify the total count of options in the country dropdown', async ({
  page,
}) => {
  await page.getByTestId('dropdown-country').click();
  const options = page.locator('[role="option"]');
  await expect(options).toHaveCount(4);
});

// test('TC08: Verify default placeholder text before any selection', async ({
//   page,
// }) => {});
