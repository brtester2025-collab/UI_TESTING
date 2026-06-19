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
    await this.page.getByText(name, { exact: true }).click();
  }

  async addCart() {
    await this.addToCart.click();
  }
}
