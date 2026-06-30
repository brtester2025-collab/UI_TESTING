import { test, expect } from "@playwright/test";
import { HomePageLogin } from "../page/loginr";
import { Searching } from "../page/searchbar";
import { productDetail } from "../page/productdetail";

let Home: HomePageLogin;
let search: Searching;
let productData: productDetail;

test.beforeEach("Product Detail Page", async ({ page }) => {
  Home = new HomePageLogin(page);
  search = new Searching(page);
  productData = new productDetail(page);

  await Home.goto();
  await Home.verification();
  await Home.storeName();
});

test("find the product in serach and click on the product detail page", async () => {
  const data = "testTRx";
  await search.searchItem(data);
  await search.searchButtonCLick();
  await expect(search.productNameVisible(data)).toBeVisible();
  await search.productClick(data);
  await productData.productPrice(" $100 ");

  expect(await productData.productImage()).toBe(true);
});

test.only("verify the product desc and reviews is visible", async () => {
  const data = "testTRx";
  await search.searchItem(data);
  await search.searchButtonCLick();
  await search.productClick(data);
  await productData.brandClick();
  expect(await productData.verfiydesc()).toBe(true);
  await productData.descriptionClick();
  await productData.verifydescContent();
  expect(await productData.verfiydesc()).toBe(true);
});
