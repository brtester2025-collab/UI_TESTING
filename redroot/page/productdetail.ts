import { Locator, Page, expect } from "@playwright/test";

export class productDetail {
  readonly image: Locator;
  readonly name: Locator;
  readonly price: Locator;

  readonly showcount: Locator;
  readonly addqty: Locator;
  readonly subqty: Locator;
  readonly addButton: Locator;
  readonly errorMsg: Locator;

  readonly description: Locator;
  readonly descriptionContent: Locator;
  readonly Brand: Locator;
  readonly brandContent: Locator;
  readonly shortDesc: Locator;
  readonly reviews: Locator;

  constructor(page: Page) {
    this.image = page.locator(".main-image-area");
    this.name = page.locator(".product-infor-name mb-12");
    this.price = page.locator(".price-on-sale");

    this.showcount = page.locator("#qty");
    this.addqty = page.locator(".fi-rr-plus");
    this.subqty = page.locator(".fi-rr-minus");

    this.addButton = page.getByText("Add To Cart", { exact: true });
    this.errorMsg = page.locator(`.loader-modal`);

    this.description = page.locator(".home").first();
    this.descriptionContent = page.locator(".product-detail-text-content");
    this.Brand = page.locator(".blog").first();
    this.brandContent = page.locator(".product-detail-text-content");

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

  async addCartButton() {
    await this.addButton.click();
  }

  async productPrice(prices: any) {
    await expect(this.price).toContainText(prices);
  }

  async descriptionClick() {
    await this.description.click();
  }
  async brandClick() {
    await this.Brand.click();
  }

  async shortdescClick() {
    await this.shortDesc.click();
  }

  async reviewClick() {
    await this.reviews.click();
  }

  async verfiydesc() {
    const data = await this.brandContent.isVisible();
    return data;
  }
  async verifydescContent() {
    await expect(this.descriptionContent).toBeVisible();
  }

  async overQunatitymsg() {
    await expect(this.errorMsg).toBeVisible();
  }

  async increaseQty(count: number) {
    for (let i = 1; i < count; i++) {
      await this.addqty.click();
    }
    await expect(this.showcount).toHaveValue(count.toString());
  }
}
