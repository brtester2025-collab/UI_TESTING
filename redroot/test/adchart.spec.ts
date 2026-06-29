import { expect, test } from "@playwright/test";
import { HomePageLogin } from "../page/loginr";

import { Searching } from "../page/searchbar";
import { AdChart } from "../page/adcart";

let login: HomePageLogin;
let search: Searching;
let addchart: AdChart;

test.beforeEach("add to cart ", async ({ page }) => {
  login = new HomePageLogin(page);
  search = new Searching(page);
  addchart = new AdChart(page);

  await login.goto();
  await login.verification();

  await login.storeName();
});

test("Verify the cart URL", async ({ page }) => {
  await search.searchItem("Neo Passion Flower 14g");
  await search.searchButtonCLick();

  await addchart.addtoCart();
  await addchart.cartViewSection();
  await expect(page).toHaveURL("https://redrootstrading.ca/cart");
});

test.only("guest serach the product and add to the cart", async ({ page }) => {
  await search.searchItem("test");
  await search.searchButtonCLick();

  await addchart.cartViewSection();
  await addchart.addtoCart();
  await expect(addchart.addmsg).toBeVisible();
});
