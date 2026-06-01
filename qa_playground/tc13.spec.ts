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

test('file', async ({ page }) => {
  console.log('page is working');
});
