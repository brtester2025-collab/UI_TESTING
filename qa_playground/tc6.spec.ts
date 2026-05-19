import { expect, test } from '@playwright/test';

test.beforeEach('Dropdown Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-alerts-dialogs').click();
});

test.skip('TC01: Accept a simple browser alert and verify it closes', async ({
  page,
}) => {
  page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });
  await page.locator('#btn-simple-alert').click();
  const button = await page.locator('#btn-simple-alert');

  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});

test.skip('TC02: Get text from a simple browser alert before accepting', async ({
  page,
}) => {
  page.on('dialog', async (d) => {
    expect(d.message()).toBe('Welcome to QA PlayGround!');
    await d.accept();
  });
  await page.locator('#btn-simple-alert').click();
});

test('TC03: Accept a confirm dialog and verify accepted state', async ({
  page,
}) => {
  page.on('dialog', async (d) => {
    await d.accept();
  });
  await page.locator('#btn-confirm-alert').click();
  await expect(page.getByTestId('result-confirm')).toHaveText(
    'Result: Accepted'
  );
});

test('TC04: Dismiss a confirm dialog and verify dismissed state', async ({
  page,
}) => {
  page.on('dialog', async (d) => {
    await d.dismiss();
  });
  await page.locator('#btn-confirm-alert').click();
  await expect(page.getByTestId('result-confirm')).toHaveText(
    'Result: Dismissed'
  );
});
