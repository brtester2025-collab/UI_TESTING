import { test, expect } from "@playwright/test";
import { HomePageLogin } from "../page/cart.ts";

let login: HomePageLogin;

test.beforeEach("Verification Page", async ({ page }) => {
  login = new HomePageLogin(page);
  await login.goto();
  await login.verification();
  await login.storeName();
});

test("Add to cart when the user in Guest", async ({ page }) => {});
