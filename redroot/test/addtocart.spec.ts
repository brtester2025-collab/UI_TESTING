import { test, expect } from "@playwright/test";
import { HomePageLogin } from "../page/cart.ts";
import { AddChart } from "../page/addtocart.ts";

let login: HomePageLogin;
let addcart: AddChart;

test.beforeEach("Verification Page", async ({ page }) => {
  login = new HomePageLogin(page);
  addcart = new AddChart(page);
  await login.goto();
  await login.verification();
  await login.storeName();
});

test("Go the deal Page", async ({ page }) => {
  await addcart.selectCategory(" Deals ");
  await expect(page).toHaveURL("https://redrootstrading.ca/shop/deals");
});

test("Go to flower Page", async ({ page }) => {
  await addcart.selectCategory(" Flowers ");
  await expect(page).toHaveURL();
});
