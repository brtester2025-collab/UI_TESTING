import dotenv from 'dotenv';
dotenv.config();

import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/login');
    await page.fill('#email', process.env.USERMAIL);
    await page.fill('#password', process.env.USERPASSWORD);
    await page.getByTestId('login-button').click();
    await page.goto('https://www.qaplayground.com/practice')
    await page.getByTestId('card-link-input-fields').click()

});

test('Input Field Automation', async ({ page }) => {

    await page.fill('#movieName', "inception");
    await page.locator('#appendText').click()
    await page.keyboard.press("End")
    await page.keyboard.type("and feeling great")
    await page.locator('#appendText').press("Tab")
    await expect(page.locator("#insideText")).toHaveValue("QA PlayGround");
    await page.locator("#clearText").fill("");
    await expect(page.locator("#clearText")).toHaveValue("");
    await expect(page.locator("#disabledInput")).toBeDisabled();
    await expect(page.locator("#readonlyInput")).toHaveAttribute("readonly", "");
    await expect(page.locator("#readonlyInput")).toHaveValue("This text is readonly");
});


test('TC01: Verify successful movie name input', async ({ page }) => {
    const input = await page.getByTestId("input-movie-name")
    const data = await page.getByPlaceholder('Enter hollywood movie name')
    expect(data).toBeVisible()
    await input.fill('Inception')
    const result = await input.inputValue()
    expect(result).toBe('Inception')
})

test('TC02: Verify input placeholder disappears on typing', async ({ page }) => {
    const input = await page.getByPlaceholder("Enter hollywood movie name")
    expect(input).not.toBeVisible()
})


test('TC03: Verify keyboard tab triggers focus change after append', async ({ page }) => {
    const input = await page.getByTestId("input-append-text")
    await page.keyboard.press('End')
    await page.keyboard.type("This is X data for GenX")
    input.press("Tab")
    await expect(page.locator("#insideText")).toBeFocused()
})

test('TC04: Verify appended text value is retained in the field', async ({ page }) => {
    const input = await page.getByTestId('input-append-text')

    // expect(page.locator('#appendText')).toHaveValue("I am good")
    const oldValue = await input.inputValue()
    await input.click();
    await page.keyboard.press('End')
    await page.keyboard.type('sam test')
    await expect(input).toHaveValue(oldValue + 'sam test')

})



test('TC05: Verify text present inside input field matches expected value', async ({ page }) => {
    const input = await page.getByTestId('input-verify-text')
    expect(input).toBeVisible()
    await expect(input).toHaveValue("QA PlayGround")
})


test('TC06: Verify getAttribute returns the correct input value', async ({ page }) => {
    const input = await page.getByTestId('input-verify-text')
    const verify = await input.getAttribute('value')
    expect(verify).toBe('QA PlayGround')
})

test('TC07: Verify input field text can be cleared successfully', async ({ page }) => {
    const input = await page.getByTestId('input-clear-text')
    expect(input).toHaveValue('QA PlayGround Clear Me')
    await input.fill('')
    await expect(input).toHaveValue('')
})


test('TC08: Verify field is empty after executing clear action', async ({ page }) => {
    const input = await page.getByTestId('input-clear-text')
    await input.fill("This is meeeeee")
    await input.clear()
    await expect(input).toHaveValue('')
})

test('TC09: Verify disabled input field cannot be edited by user', async ({ page }) => {
    const input = await page.getByTestId('input-disabled')
    await expect(page.locator('#disabledInput')).toBeDisabled()
    await input.type("Disaster")
    await expect(input).toHaveValue('Enter')
})


test('TC10: Verify isEnabled() returns false for disabled input', () => {

})

test('TC11: Verify readonly input field does not accept user typing', async ({ page }) => {
    const input = await page.getByTestId('input-readonly')
    await expect(input).toHaveAttribute('readonly', "")
    await input.type('YES this is me')
    await expect(input).toHaveValue('This text is readonly')
})

test('TC12: Verify getAttribute returns correct readonly attribute value', async ({ page }) => {
    const input = await page.getByTestId('input-readonly')
    await input.getAttribute('value')
    await expect(input).toHaveAttribute('readonly', '')
})