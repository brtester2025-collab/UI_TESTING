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
  page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });
  await page.locator('#btn-simple-alert').click();
  const button = await page.locator('#btn-simple-alert');

  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});

test('TC02: Get text from a simple browser alert before accepting', async ({
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

test('TC05: Enter text in a prompt dialog and accept it', async ({ page }) => {
  page.on('dialog', async (d) => {
    await d.accept('John Doe');
  });
  await page.locator('#btn-prompt-alert').click();
  await expect(page.getByTestId('result-prompt')).toContainText(
    'Your name is — John Doe'
  );
});

test('TC06: Dismiss a prompt dialog and verify no input is captured', async ({
  page,
}) => {
  page.on('dialog', async (d) => {
    await d.dismiss();
  });

  await page.locator('#btn-prompt-alert').click();
  await expect(page.getByTestId('result-prompt')).not.toBeVisible();
});

test('TC07: Verify toast notification appears after triggering', async ({
  page,
}) => {
  await page.locator('#btn-toast-alert').click();
  await expect(page.locator('[data-sonner-toast]')).toBeVisible();
});

test('TC08: Close a modal/sweet alert using the Cancel button', async ({
  page,
}) => {
  await page.getByTestId('btn-modal-alert').click();
  const modal = page.getByText('Modern Alert').first();
  await expect(modal).toBeVisible();
  await page.getByRole('button', { name: 'You Are!' }).click();
  await expect(modal).not.toBeVisible();
});

test('TC09: Close an advanced dialog using the Close button', async ({
  page,
}) => {
  await page.getByTestId('btn-dialog-share').click();
  const dialog = page.locator('[role="dialog"]');
  await expect(dialog).toBeVisible();

  const linkInput = dialog.locator('input');
  await expect(linkInput).toBeVisible();

  await expect(linkInput).toHaveValue(
    /qaplayground\.com\/practice\/alerts-dialogs/
  );
  await dialog.getByRole('button', { name: 'Close' }).first().click();
  await expect(dialog).not.toBeVisible();
});
