import { test, expect } from "@playwright/test";

import { HomePageLogin } from "../page/loginr.ts";
import { Searching } from "../page/searchbar.ts";

let login: HomePageLogin;
let search: Searching;

test.beforeEach("Searching menu", async ({ page }) => {
  login = new HomePageLogin(page);
  search = new Searching(page);
  await login.goto();
  await login.verification();
  await login.storeName();
});

test("Product Found", async ({ page }) => {
  await search.searchItem("orga");
  await search.searchButtonCLick();
  search.productNameVisible(" OCB Organic Hemp 1 1/4 Rolling Papers ");
  await search.productVisible(" OCB Organic Hemp 1 1/4 Rolling Papers ");
});

test("Product Not found", async () => {
  await search.searchItem("data");
  await search.searchButtonCLick();
  await search.productNotVisible();
});
