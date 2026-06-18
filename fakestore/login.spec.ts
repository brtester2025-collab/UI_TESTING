import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();
import { loginPage } from "./pages/login";

test("TC-LOGIN page", async ({ page }) => {
  const newData = new loginPage(page);
  await newData.goto();
  await newData.LoginPage(
    process.env.usernamez || " ",
    process.env.password || "",
  );
  await newData.clickButton();
  await expect(page).toHaveURL("https://letcode.in/home");
});
