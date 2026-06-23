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

test("Product count on the Home page", async ({ page }) => {
  const datas = await count.countProduct();
  console.log("the answer is corrent: ", datas);
  expect(datas).toBe(52);
});

test("Product count on the Deal Page", async ({ page }) => {});
