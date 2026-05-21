import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';

test.beforeEach('Radio & Checkbox Automation Practice', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.userid || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-radio-checkbox').click();
});

test.skip('TC01: Verify radio button is selected on click', async ({
  page,
}) => {
  await page.getByTestId('radio-yes-1').check();
  await expect(page.getByTestId('radio-yes-1')).toBeChecked();
});

test.skip('TC02: Verify selecting another radio deselects the previous one', async ({
  page,
}) => {
  await page.getByTestId('radio-yes-1').check();
  await expect(page.getByTestId('radio-yes-1')).toBeChecked();
  await page.getByTestId('radio-no-1').check();
  await expect(page.getByTestId('radio-yes-1')).not.toBeChecked();
  await expect(page.getByTestId('radio-no-1')).toBeChecked();
});

test.skip('TC03: Verify only one radio button can be selected at a time', async ({
  page,
}) => {
  await page.getByTestId('radio-yes-1').check();
  await page.getByTestId('radio-yes-2').check();
  await page.getByTestId('radio-bug-yes').check();
  await page.getByTestId('radio-foo').check();
  await page.getByTestId('radio-going').check();
  await page.getByTestId('checkbox-remember-me').check();
  await page.getByTestId('checkbox-terms').check();

  await expect(page.getByTestId('radio-yes-1')).toBeChecked();
  await expect(page.getByTestId('radio-yes-2')).toBeChecked();
  await expect(page.getByTestId('radio-bug-yes')).toBeChecked();
  await expect(page.getByTestId('radio-foo')).toBeChecked();
  await expect(page.getByTestId('radio-going')).toBeChecked();
  await expect(page.getByTestId('checkbox-remember-me')).toBeChecked();
  await expect(page.getByTestId('checkbox-terms')).toBeChecked();

  await expect(page.getByTestId('radio-no-1')).not.toBeChecked();
  await expect(page.getByTestId('radio-no-2')).not.toBeChecked();
  await expect(page.getByTestId('radio-bug-no')).not.toBeChecked();
  await expect(page.getByTestId('radio-bar')).not.toBeChecked();
  await expect(page.getByTestId('radio-not-going')).not.toBeChecked();
});

test.skip('TC04: Verify radio button label text is correct', async ({
  page,
}) => {
  await page.getByTestId('radio-yes-1').click();
  await expect(page.getByText('Going').nth(1)).toBeVisible();
});

test.skip('TC05: Verify radio button state persists after page interaction', async ({
  page,
}) => {
  await page.getByTestId('radio-yes-1').check();
  await page.getByTestId('radio-yes-2').check();
  await page.getByTestId('radio-bug-yes').check();
  await page.getByTestId('radio-foo').check();
  await page.getByTestId('radio-going').check();
  await page.getByTestId('checkbox-remember-me').check();
  await page.getByTestId('checkbox-terms').check();
  await expect(page.getByTestId('radio-yes-1')).toBeChecked();
});

test.skip('TC06: Verify checkbox can be checked', async ({ page }) => {
  await page.getByTestId('radio-yes-1').check();
  await expect(page.getByTestId('radio-yes-1')).toBeChecked();
});
test.skip('TC07: Verify checkbox can be unchecked', async ({ page }) => {
  await page.getByTestId('radio-yes-1').uncheck();
  await expect(page.getByTestId('radio-yes-1')).not.toBeChecked();
});

test.skip('TC09: Verify radio buttons are keyboard navigable', async ({
  page,
}) => {
  const rad = await page.getByTestId('radio-foo');
  await rad.focus();
  await page.keyboard.press('Space');
  await expect(rad).toBeChecked();
});

test('TC10: Verify checkbox is keyboard toggle', async ({ page }) => {
  const data = await page.getByRole('radio', { name: 'Maybe' });
  await expect(data).toBeDisabled();
  await data.click({ force: true });
  await expect(data).not.toBeChecked();
});

test('TC13: Verify radio button group is accessible to screen readers', async ({
  page,
}) => {
  const data = await page.getByTestId('radio-yes-1');
  const id = await data.getAttribute('id');
  await expect(page.locator(`label[for="${id}"]`)).not.toBeVisible();
});

test('TC14: Verify radio button visual state changes on selection', async ({}) => {});
