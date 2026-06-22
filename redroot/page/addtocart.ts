import { type Page, type Locator } from "@playwright/test";

export class AddChart {
  readonly page: Page;
  readonly addToCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCart = page.getByRole("button", {
      name: "ADD TO CART",
    });
  }

  async selectCategory(name: string) {
    await this.page.locator('#header').getByRole("link",{name}).click();
  }

  async addCart() {
    await this.addToCart.click();
  }
}
