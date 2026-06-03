import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.beforeEach('File Upload & Download Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.userid || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('card-link-file-upload').click();
});

test.skip('TC01: Verify a file can be selected for upload', async ({
  page,
}) => {
  const fileInput = await page.getByTestId('file-upload-input');

  await fileInput.setInputFiles('./test.docx');
  const verification = await fileInput.evaluate(
    (el: HTMLInputElement) => el.files?.[0]?.name
  );
  await expect(verification).toBe('test.docx');
});

test.skip('TC02: Verify selected file name is displayed after selection', async ({
  page,
}) => {
  const data1 = await page.getByTestId('file-upload-input');
  data1.setInputFiles('test.docx');
  console.log(data1);
  await expect(page.getByTestId('file-path-display')).toContainText(
    'test.docx'
  );
});

test('TC03: Verify download starts on clicking the download button', async ({
  page,
}) => {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#btn-download-image').click(),
  ]);

  await download.saveAs('./downloads/' + download.suggestedFilename());
  console.log('download', download.suggestedFilename());
  expect(download.suggestedFilename()).toContain('android-chrome-512x512.png');
});
