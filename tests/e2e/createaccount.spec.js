const { test, expect } = require('@playwright/test')


test.describe('Register Page', () => {
    test.beforeEach('Home Page', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
        await page.hover('text= Manage Users')
        await page.click('text=Sign In')
        await page.click('text=Sign up now')

    });


    test('to contain tne element is visible', async ({ page }) => {
        const firstName = page.getByPlaceholder('Enter first name')
        const lastName = page.getByPlaceholder('Enter last name')
        const MobileNo = page.getByPlaceholder('Enter 10-digit number')
        const emailAdd = page.getByPlaceholder('Enter email address')
        const Address = page.getByPlaceholder('Enter your full address')

        await expect(firstName).toBeVisible();
        await expect(lastName).toBeVisible();
        await expect(MobileNo).toBeVisible();
        await expect(emailAdd).toBeVisible();
        await expect(Address).toBeVisible();


    })

    test('Create Account page', async ({ page }) => {
        await page.getByPlaceholder('Enter first name').fill('test')
        await page.getByPlaceholder('Enter last name').fill('one')
        await page.getByPlaceholder('Enter 10-digit number').fill('8126361535')
        await page.getByPlaceholder('Enter email address').fill('testone@mailinator.com')
        await page.getByPlaceholder('Enter your full address').fill('Hill Drive, Bhavnagar, Bhavnagar, Gujarat, India')
    })

    test('Error for the Empty field validation', async ({ page }) => {
        await page.click('button[type="submit"]')
        const error_first = page.getByText('First Name is required')
        const error_mobile = page.getByText('Valid 10-digit mobile number is required')
        const error_email = page.getByText('email is required')
        const error_address = page.getByText('Address is required')
        await expect(error_first).toBeVisible()
        await expect(error_last).toBeVisible()
        await expect(error_mobile).toBeVisible()
        await expect(error_email).toBeVisible()
        await expect(error_address).toBeVisible()
    })

    test('form Submit', async ({ page }) => {
        const firstName = page.getByPlaceholder('Enter first name')
        await page.fill('[formcontrolname="firstName"]', 'John')
        await page.fill('[formcontrolname="lastName"]', 'doe')
        await page.fill('[formcontrolname="mobile"]', '5464364356')
        await page.fill('[formcontrolname="emailId"]', 'test@mailinator.com')
        await page.getByPlaceholder('Enter you full address').fill('tamil nadu')
        await page.click('button[type="submit"]')

    })
})

