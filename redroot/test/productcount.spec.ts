import { expect, test } from "@playwright/test";

import { HomePageLogin } from "../page/loginr";
import { ProductCount } from "../page/productcount";

let login: HomePageLogin;
let count: ProductCount;

test.beforeEach("Product count check", async ({ page }) => {
  login = new HomePageLogin(page);
  count = new ProductCount(page);

  await login.goto();
  await login.verification();
  await login.storeName();
});

test("test to count the page", async ({ page }) => {
  const data = await count.countProduct();
  expect(data).toBe(52);
});
