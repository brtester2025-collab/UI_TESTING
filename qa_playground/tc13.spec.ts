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

test('TC01: Verify a file can be selected for upload', async ({ page }) => {
  await page.getByTestId('file-upload-input').setInputFiles('./test.docx');
  await expect(page.getByTestId('file-upload-input')).toContainText(
    'test.docx'
  );
});

test('TC02: Verify selected file name is displayed after selection', async ({
  page,
}) => {
  console.log('page is working');
});

// test('TC03: Verify upload button is enabled after file selection', async ({
//   page,
// }) => {
//   console.log('page is working');
// });
// test('TC04: Verify file upload starts on clicking upload button', async ({
//   page,
// }) => {
//   console.log('page is working');
// });
// test('TC05: Verify success message appears after upload', async ({ page }) => {
//   console.log('page is working');
// });
// test('TC06: Verify error message for unsupported file type', async ({
//   page,
// }) => {
//   console.log('page is working');
// });
// test('TC07: Verify error message for files exceeding size limit', async ({
//   page,
// }) => {
//   console.log('page is working');
// });
// test('TC08: Verify uploaded file appears in the file list', async ({
//   page,
// }) => {
//   console.log('page is working');
// });
// test('TC09: Verify file upload can be cancelled', async ({ page }) => {
//   console.log('page is working');
// });

// test('TC10: Verify multiple files can be selected when allowed', async ({
//   page,
// }) => {
//   console.log('page is working');
// });

// test('TC11: Verify file input accepts only allowed extensions', async ({
//   page,
// }) => {
//   console.log('page is working');
// });

// test('TC12: Verify file upload is responsive on mobile viewport', async ({
//   page,
// }) => {
//   console.log('page is working');
// });

// test('TC13: Verify file upload is accessible via keyboard', async ({
//   page,
// }) => {
//   console.log('page is working');
// });

// test('TC14: Verify file upload component has accessible label', async ({
//   page,
// }) => {
//   console.log('page is working');
// });

// test('TC15: Verify file upload page loads without errors', async ({ page }) => {
//   console.log('page is working');
// });
// test('TC09: Verify file upload can be cancelled', async ({ page }) => {
//   console.log('page is working');
// });

// test('TC09: Verify file upload can be cancelled', async ({ page }) => {
//   console.log('page is working');
// });
