import { Locator, Page, expect } from "@playwright/test";

export class productDetail {
  readonly image: Locator;
  readonly name: Locator;
  readonly price: Locator;

  readonly addcount: Locator;
  readonly addqty: Locator;
  readonly subqty: Locator;
  readonly addButton: Locator;

  readonly description: Locator;
  readonly Brand: Locator;
  readonly shortDesc: Locator;
  readonly reviews: Locator;

  constructor(page: Page) {
    this.image = page.locator(".main-image-area");
    this.name = page.locator(".product-infor-name mb-12");
    this.price = page.locator(".price-on-sale");

    this.addcount = page.locator(".wg-quantity");
    this.subqty = page.locator(".btn-quantity btn-decrease");
    this.addqty = page.locator(".btn-quantity btn-increase");
    this.addButton = page.getByRole("button", { name: "Add to chart" });

    this.description = page.locator(".home");
    this.Brand = page.locator(".blog");
    this.shortDesc = page.locator(".help");
    this.reviews = page.locator(".Reviews");
  }

  async productImage() {
    const data = await this.image.isVisible();
    return data;
  }
  async productName(names: string) {
    await expect(this.name).toContainText(names);
  }

  async productPrice(prices: any) {
    await expect(this.price).toContainText(prices);
  }
}
