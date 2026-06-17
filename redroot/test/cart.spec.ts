import { test, expect } from "@playwright/test";

import { HomePageLogin } from "../page/cart";

test("login page", async ({ page }) => {
  const login = new HomePageLogin(page);
  await login.goto();
  await login.verification();
  await login.storeName();
  await login.registerClick();
  await login.loginData("testqa@mailinator.com", "123456");
  await login.signClick();
  await expect(page).toHaveURL("https://redrootstrading.ca/");
});
