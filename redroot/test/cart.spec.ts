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
  await login.loginData("", "test");
  await login.signClick();
  await expect(
    page.getByRole("heading", {
      name: "Please enter both email and password.",
    }),
  ).toBeVisible();
});

test("To check password cannot be empty", async ({ page }) => {
  await login.loginData("testzeta@mailinator.com", "");
  await login.signClick();
  await expect(
    page.getByRole("heading", {
      name: "Please enter both email and password.",
    }),
  ).toBeVisible();
});

test("username and password field with empty space", async ({ page }) => {
  await login.loginData(" ", " ");
  await login.signClick();
  await expect(
    page.getByRole("heading", {
      name: "Please enter your mobile or email",
    }),
  ).toBeVisible();
});
test("Invalid username and password", async ({ page }) => {
  await login.loginData("testzeta@mailinator.com", "123456");
  await login.signClick();
  await expect(
    page.getByRole("heading", {
      name: "No account found with this email or mobile. Please check your email or create a new account.",
    }),
  ).toBeVisible;
});
