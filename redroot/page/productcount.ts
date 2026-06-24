import { type Locator, type Page } from "@playwright/test";

export class ProductCount {
  readonly statuscount: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.statuscount = page.locator(".pc-price");
    this.page = page;
  }

  async countProduct() {
    await this.page.waitForLoadState("networkidle");
    const data = await this.statuscount.count();
    return data;
  }
}
