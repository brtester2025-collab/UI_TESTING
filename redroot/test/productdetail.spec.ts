import { test } from "@playwright/test";
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
});
