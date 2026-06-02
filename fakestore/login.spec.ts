import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach("Login", async ({ page }) => {
  await page.goto("https://letcode.in/login");
  console.log(process.env.usernamez);
  console.log(process.env.password);
  await page
    .getByPlaceholder("Enter Username")
    .fill(process.env.usernamez || "");
  await page
    .getByPlaceholder("Enter Password")
    .fill(process.env.password || "");

  await page.getByRole("button", { name: "Login" }).click();
});

test("case 1", async ({ page }) => {
  await expect(page).toHaveURL("https://letcode.in/home");
});
