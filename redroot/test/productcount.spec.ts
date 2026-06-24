import { expect, test } from "@playwright/test";

import { HomePageLogin } from "../page/loginr";
import { ProductCount } from "../page/productcount";
import { AddChart } from "../page/addtocart";

let login: HomePageLogin;
let count: ProductCount;

let visit: AddChart;

test.beforeEach("Product count check", async ({ page }) => {
  login = new HomePageLogin(page);
  count = new ProductCount(page);
  visit = new AddChart(page);

  await login.goto();
  await login.verification();
  await login.storeName();
});

test("Product count on the Home page", async ({ page }) => {
  const datas = await count.countProduct();
  console.log("the answer is corrent: ", datas);
  expect(datas).toBe(52);
});

test("Product count on the Deal Page", async ({ page }) => {
  await visit.selectCategory("Deal");
  const datas = await count.countProduct();
  console.log("for deal sections", datas);
  expect(datas).toBeGreaterThan(20);
});

test("Product count on the flower Page", async ({ page }) => {
  await visit.selectCategory(" FLOWER ");
  const datas = await count.countProduct();
  console.log("for flower section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the Pre-Roll page", async ({ page }) => {
  await visit.selectCategory(" PRE-ROLLS ");
  const datas = await count.countProduct();
  console.log("for pre-rolls section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the CONCENTRATES page", async ({ page }) => {
  await visit.selectCategory(" CONCENTRATES ");
  const datas = await count.countProduct();
  console.log("for CONCENTRATES section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the HASH page", async ({ page }) => {
  await visit.selectCategory(" HASH ");
  const datas = await count.countProduct();
  console.log("for HASH section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the THC VAPES page", async ({ page }) => {
  await visit.selectCategory(" THC VAPES ");
  const datas = await count.countProduct();
  console.log("for THC VAPES section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the TOBACCO page", async ({ page }) => {
  await visit.selectCategory(" TOBACCO ");
  const datas = await count.countProduct();
  console.log("for TOBACCO section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the WELLNESS page", async ({ page }) => {
  await visit.selectCategory(" WELLNESS ");
  const datas = await count.countProduct();
  console.log("for WELLNESS section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the ACCESSORIES  page", async ({ page }) => {
  await visit.selectCategory(" ACCESSORIES ");
  const datas = await count.countProduct();
  console.log("for ACCESSORIES section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});

test("Product count on the SNACKS  page", async ({ page }) => {
  await visit.selectCategory(" SNACKS ");
  const datas = await count.countProduct();
  console.log("for SNACKS section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});
test("Product count on the RAFFLE page", async ({ page }) => {
  await visit.selectCategory(" RAFFLE ");
  const datas = await count.countProduct();
  console.log("for RAFFLE section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});
test("Product count on the MERCHANDISE page", async ({ page }) => {
  await visit.selectCategory(" MERCHANDISE ");
  const datas = await count.countProduct();
  console.log("for MERCHANDISE section", datas);
  expect(datas).toBeGreaterThanOrEqual(10);
});
