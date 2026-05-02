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

test("TC04: Verify double-click button triggers double-click action", async ({
  page,
}) => {
  const buttons = await page.getByTestId("btn-double-click").dblclick();
  await expect(page.locator("btn-double-click")).toContainText(
    "Double Click Me",
  );
});

test("TC05: Verify right-click button triggers context menu action", async ({
  page,
}) => {});

test("TC06: Verify disabled button cannot be clicked", async ({ page }) => {});
test("TC07: Verify button is enabled when it should be", async ({
  page,
}) => {});
test("TC08: Verify button is responsive on different screen sizes", async ({
  page,
}) => {});
test("TC09: Verify button is accessible via keyboard", async ({ page }) => {});
test("TC10: Verify button is accessible to screen readers", async ({
  page,
}) => {});
