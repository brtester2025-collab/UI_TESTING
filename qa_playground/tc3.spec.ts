import { test, expect } from '@playwright/test';

test.beforeEach('Form Automation', async ({ page }) => {
  await page.goto('https://www.qaplayground.com/login');
  await page.fill('#email', process.env.USERMAIL || '');
  await page.fill('#password', process.env.USERPASSWORD || '');
  await page.getByTestId('login-button').click();
  await page.goto('https://www.qaplayground.com/practice');
  await page.getByTestId('practice-card-forms').click();
});

test('TC01: Fill all fields with valid data and submit successfully', async ({
  page,
}) => {
  await page.locator('#firstName').fill('John');
  await page.locator('#lastName').fill('Doe');
  await page.locator('#email').fill('john@example.com');
  await page.locator('#phone').fill('9876543210');
  await page.fill('#dob', '1995-06-15');
  await page.getByTestId('radio-gender-male').check();
  await expect(page.getByTestId('radio-gender-male')).toBeChecked();
  await page.getByTestId('select-country').click();
  await page.getByRole('option', { name: 'India' }).click();
  await page.locator('#city').fill('Mumbai');
  await page.locator('#password').fill('pass123');
  await page.locator('#confirmPassword').fill('pass123');
  await page.getByTestId('checkbox-terms').check();
  await expect(page.getByTestId('checkbox-terms')).toBeChecked();
  await page.locator('#submitFormBtn').click();
  await expect(page.getByTestId('form-success-msg').locator('h3')).toHaveText(
    'Form Submitted Successfully!'
  );
});

test('TC02: Verify required field errors appear on empty submit', async ({
  page,
}) => {
  await page.locator('#submitFormBtn').click();

  await expect(page.locator('#firstNameError')).toBeVisible();
  await expect(page.locator('#lastNameError')).toBeVisible();
  await expect(page.locator('#emailError')).toBeVisible();
  await expect(page.locator('#phoneError')).toBeVisible();
  await expect(page.locator('#dobError')).toBeVisible();
  await expect(page.locator('#genderError')).toBeVisible();
  await expect(page.locator('#countryError')).toBeVisible();
  await expect(page.locator('#cityError')).toBeVisible();
  await expect(page.locator('#passwordError')).toBeVisible();
  await expect(page.locator('#confirmPasswordError')).toBeVisible();
  await expect(page.locator('#termsError')).toBeVisible();
});

test('TC03: Verify invalid email format shows validation error', async ({
  page,
}) => {
  await page.locator('#email').fill('not a fail');
  await page.locator('#submitFormBtn').click();
  await expect(page.locator('#emailError')).toBeVisible();
});

test('TC04: Verify invalid phone number format shows error', async ({
  page,
}) => {
  await page.locator('#phone').fill('98764');
  await page.locator('#submitFormBtn').click();
  await expect(page.locator('#phoneError')).toBeVisible();
});

test('TC05: Verify password minimum length validation', async ({ page }) => {
  await page.locator('#password').fill('pass1');
  await page.locator('#submitFormBtn').click();
  await expect(page.locator('#passwordError')).toBeVisible();
});

test('TC06: Verify password mismatch shows confirm password error', async ({
  page,
}) => {
  await page.locator('#password').fill('pass123');
  await page.locator('#confirmPassword').fill('pass1234');
  await page.locator('#submitFormBtn').click();
  await expect(page.locator('#confirmPasswordError')).toBeVisible();
});

test('TC07: Verify T&C checkbox required error appears', async ({ page }) => {
  await expect(page.getByTestId('radio-gender-male')).not.toBeChecked();
  await page.locator('#submitFormBtn').click();
  await expect(page.locator('#genderError')).toBeVisible();
});

test('TC08: Verify success message displays submitted name', async ({
  page,
}) => {
  await page.locator('#firstName').fill('John');
  await page.locator('#lastName').fill('Doe');
  await page.locator('#email').fill('john@example.com');
  await page.locator('#phone').fill('9876543210');
  await page.fill('#dob', '1995-06-15');
  await page.getByTestId('radio-gender-male').check();
  await expect(page.getByTestId('radio-gender-male')).toBeChecked();
  await page.getByTestId('select-country').click();
  await page.getByRole('option', { name: 'India' }).click();
  await page.locator('#city').fill('Mumbai');
  await page.locator('#password').fill('pass123');
  await page.locator('#confirmPassword').fill('pass123');
  await page.getByTestId('checkbox-terms').check();
  await expect(page.getByTestId('checkbox-terms')).toBeChecked();
  await page.locator('#submitFormBtn').click();
  await expect(page.getByTestId('form-success-msg').locator('h3')).toHaveText(
    'Form Submitted Successfully!'
  );
  await expect(
    page.getByTestId('form-success-msg').locator('#submittedName')
  ).toHaveText('John Doe');
});

test('TC09: Verify reset button clears all fields', async ({ page }) => {
  await page.locator('#firstName').fill('John');
  await page.locator('#lastName').fill('Doe');
  await page.locator('#email').fill('john@example.com');
  await page.locator('#phone').fill('9876543210');
  await page.fill('#dob', '1995-06-15');
  await page.getByTestId('radio-gender-male').check();
  await expect(page.getByTestId('radio-gender-male')).toBeChecked();
  await page.getByTestId('select-country').click();
  await page.getByRole('option', { name: 'India' }).click();
  await page.locator('#city').fill('Mumbai');
  await page.locator('#password').fill('pass123');
  await page.locator('#confirmPassword').fill('pass123');
  await page.getByTestId('checkbox-terms').check();
  await expect(page.getByTestId('checkbox-terms')).toBeChecked();
  await page.locator('#resetFormBtn').click();
  await expect(page.locator('#firstName')).toBeEmpty();
  await expect(page.locator('#lastName')).toBeEmpty();
});

test('TC10: Verify gender radio button selection', async ({ page }) => {
  await page.getByTestId('radio-gender-male').check();
  await expect(page.getByTestId('radio-gender-male')).toBeChecked();
  await expect(page.getByTestId('radio-gender-female')).not.toBeChecked();
});

test('TC11: Verify country dropdown selection', async ({ page }) => {
  await page.goto('https://qaplayground.dev/apps/forms/');
  const countryDropdown = page.locator('#select-country');
  await countryDropdown.selectOption('USA');
  await expect(countryDropdown).toHaveValue('USA');
});

test('TC12: Verify multiple interest checkboxes can be selected', async ({
  page,
}) => {
  await page.getByTestId('checkbox-interest-selenium').check();
  await page.getByTestId('checkbox-interest-playwright').check();
  await expect(page.getByTestId('checkbox-interest-playwright')).toBeChecked();
  await expect(page.getByTestId('checkbox-interest-playwright')).toBeChecked();
});

test('TC13: Verify form fields retain values after validation failure', async ({
  page,
}) => {});

test('TC14: Verify Fill Again button returns to empty form from success state', async ({
  page,
}) => {
  await page.locator('#firstName').fill('John');
  await page.locator('#lastName').fill('Doe');
  await page.locator('#email').fill('john@example.com');
  await page.locator('#phone').fill('9876543210');
  await page.fill('#dob', '1995-06-15');
  await page.getByTestId('radio-gender-male').check();
  await expect(page.getByTestId('radio-gender-male')).toBeChecked();
  await page.getByTestId('select-country').click();
  await page.getByRole('option', { name: 'India' }).click();
  await page.locator('#city').fill('Mumbai');
  await page.locator('#password').fill('pass123');
  await page.locator('#confirmPassword').fill('pass123');
  await page.getByTestId('checkbox-terms').check();
  await expect(page.getByTestId('checkbox-terms')).toBeChecked();
  await page.locator('#submitFormBtn').click();
  await expect(page.getByTestId('form-success-msg').locator('h3')).toHaveText(
    'Form Submitted Successfully!'
  );
  await expect(
    page.getByTestId('form-success-msg').locator('#submittedName')
  ).toHaveText('John Doe');

  await page.getByTestId('reset-form-btn').click();
  await expect(page.getByTestId('user-registration-form')).toBeVisible();
});

test('TC15: Verify form page loads without errors', async ({ page }) => {});
