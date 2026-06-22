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
  await addcart.selectCategory(" FLOWER ");
  await expect(page).toHaveURL("https://redrootstrading.ca/shop/Flower_flower");
});

test("Go to Pre-Rolls Page", async ({ page }) => {
  await addcart.selectCategory("  PRE-ROLLS ");
  await expect(page).toHaveURL(
    "https://redrootstrading.ca/shop/Pre-Rolls_pre-rolls",
  );
});
test("Go to Concentrates Page", async ({ page }) => {
  await addcart.selectCategory(" CONCENTRATES ");
  await expect(page).toHaveURL(
    "https://redrootstrading.ca/shop/Concentrates_concentrates",
  );
});
test("Go to Hash Page", async ({ page }) => {
  await addcart.selectCategory(" HASH ");
  await expect(page).toHaveURL("https://redrootstrading.ca/shop/Hash_hash");
});
test("Go to THC Vapes Page", async ({ page }) => {
  await addcart.selectCategory(" THC VAPES ");
  await expect(page).toHaveURL(
    "https://redrootstrading.ca/shop/THC%20Vapes_vaporizers",
  );
});
test("Go to Tobacco Page", async ({ page }) => {
  await addcart.selectCategory(" TOBACCO ");
  await expect(page).toHaveURL(
    "https://redrootstrading.ca/shop/Tobacco_tobacco",
  );
});

test("Go to Wellness Page", async ({ page }) => {
  await addcart.selectCategory(" WELLNESS ");
  await expect(page).toHaveURL(
    "https://redrootstrading.ca/shop/Wellness_wellness",
  );
});

test("Go to Accessories Page", async ({ page }) => {
  await addcart.selectCategory(" ACCESSORIES ");
  await expect(page).toHaveURL(
    "https://redrootstrading.ca/shop/Accessories_accessories",
  );
});

test("Go to Snacks Page", async ({ page }) => {
  await addcart.selectCategory(" SNACKS ");
  await expect(page).toHaveURL("https://redrootstrading.ca/shop/Snacks_snacks");
});

test("Go to Raffle Page", async ({ page }) => {
  await addcart.selectCategory(" RAFFLE ");
  await expect(page).toHaveURL("https://redrootstrading.ca/shop/Raffle_raffle");
});

test("Go to Merchandise Page", async ({ page }) => {
  await addcart.selectCategory(" MERCHANDISE ");
  await expect(page).toHaveURL(
    "https://redrootstrading.ca/shop/Merchandise_merch",
  );
});
