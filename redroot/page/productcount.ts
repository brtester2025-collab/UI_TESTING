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
    // return count;
    // for (let i = 0; i < count; i++) {
    //   console.log(i + 1, await this.statuscount.nth(i).textContent());
    // }
    const data = await this.statuscount.count();
    return data;
  }
}
