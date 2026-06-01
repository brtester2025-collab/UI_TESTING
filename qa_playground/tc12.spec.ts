import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.beforeEach('Multi-Select Automation Practice', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.userid || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-multi-select').click();
});

test('TC01: Select multiple fruits using Ctrl+click in a native multi-select', async ({
  page,
}) => {
  await page.selectOption('#fruitMultiSelect', ['Apple', 'Banana', 'Orange']);
  await expect(page.getByTestId('fruit-selected-output')).toContainText(
    'apple, banana, orange'
  );
});
test('TC02: Deselect a specific option from a pre-selected multi-select', async ({
  page,
}) => {
  // await page.selectOption('#fruitMultiSelect', ['Apple', 'Banana', 'Orange']);
  // await expect(page.getByTestId('fruit-selected-output')).toContainText(
  //   'apple, banana, orange'
  // );
  // await page.selectOption('#fruitMultiSelect', []);
  // await expect(page.getByTestId('fruit-selected-output')).toContainText('');

  const el = page.getByTestId('skills-multi-select');

  const el2 = page.getByTestId('skills-multi-select');
  const current = await el.evaluate((select) =>
    Array.from((select as HTMLSelectElement).selectedOptions).map(
      (o) => o.value
    )
  );
  console.log(current);

  expect(current).toContain('playwright');

  await el.selectOption(['selenium', 'cypress']);
  await expect(page.getByTestId('skills-selected-output')).not.toContainText(
    'playwright'
  );

  const page1 = await el2.evaluate((select) =>
    Array.from((select as HTMLSelectElement).selectedOptions).map(
      (takeout) => takeout.value
    )
  );
  console.log(page1);
});
test('TC03: Select all countries using the Select All button', async ({
  page,
}) => {
  await page.getByTestId('select-all-btn').click();
  const TotalSelect = await page
    .getByTestId('country-multi-select')
    .locator('option')
    .count();
  console.log(TotalSelect);

  const selectCount = await page
    .getByTestId('country-multi-select')
    .locator('option:checked')
    .count();
  console.log(selectCount);

  expect(selectCount).toBe(TotalSelect);
});
test('TC04: Check multiple checkboxes and verify selected output', async ({
  page,
}) => {
  await page.getByTestId('tech-checkbox-react').check();
  await page.getByTestId('tech-checkbox-vue').check();

  const verify = await page
    .getByTestId('tech-checkbox-group')
    .locator('input[type="checkbox"]:checked')
    .count();

  expect(verify).toBe(2);
  await expect(page.getByTestId('tech-selected-output')).toContainText(
    'react, vue'
  );
});

test('TC05: Add a tag and then remove it from the chip-based multi-select', async ({
  page,
}) => {
  await page.getByTestId('tag-option-automation').click();
  await page.getByTestId('tag-option-selenium').click();

  await expect(page.getByTestId('tag-badge-automation')).toBeVisible();

  await page.getByTestId('remove-tag-automation').click();
  await expect(page.getByTestId('tag-count')).toHaveText('1');
});
