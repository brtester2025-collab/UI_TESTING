import dotenv from "dotenv";
dotenv.config();
import { test, expect } from "@playwright/test";

test.beforeEach("Button Automation", async ({ page }) => {
  await page.goto("https://www.qaplayground.com/login");
  await page.fill("#email", process.env.USERMAIL || "");
  await page.fill("#password", process.env.USERPASSWORD || "");
  await page.getByTestId("login-button").click();
  await page.goto("https://www.qaplayground.com/practice");
  await page.getByTestId("card-link-buttons").click();
});

test("TC01: Verify button is clickable and triggers action", async ({
  page,
}) => {
  await page.getByTestId("btn-goto-home").click();
  await expect(page.locator("#main-content")).toBeVisible();
});

test("TC02: Verify button displays the correct label text", async ({
  page,
}) => {
  await page.getByTestId("btn-goto-home");
  await expect(page.locator("#btn-goto-home")).toContainText("Go To Home");
});

test("TC03: Verify button triggers the correct action on click", async ({
  page,
}) => {
  const buttons = await page.getByTestId("btn-goto-home");
  await buttons.click();
  await expect(page).toHaveURL("https://www.qaplayground.com/");
});
