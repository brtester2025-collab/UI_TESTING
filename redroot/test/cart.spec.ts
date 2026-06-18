import { test, expect } from "@playwright/test";

import { HomePageLogin } from "../page/cart";

let login: HomePageLogin;

test.beforeEach("Login Case", async ({ page }) => {
  login = new HomePageLogin(page);
  await login.goto();
  await login.verification();
  await login.storeName();
  await login.registerClick();
});

test("login page", async ({ page }) => {
  await login.loginData("testqa@mailinator.com", "123456");
  await login.signClick();
  await expect(page).toHaveURL("https://redrootstrading.ca/");
});

test("check if the user name is not empty", async ({ page }) => {
  await login.loginData(" ", "test");
  await login.signClick();
  await expect(login.emailandPasswordError).toBeVisible();
});
