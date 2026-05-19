import { expect, test } from '@playwright/test';

test.beforeEach('Dropdown Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-alerts-dialogs').click();
});

test('TC01: Accept a simple browser alert and verify it closes', async ({
  page,
}) => {
  page.once('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });
  await page.locator('#btn-simple-alert').click();
});
