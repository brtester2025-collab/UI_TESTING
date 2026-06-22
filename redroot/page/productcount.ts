import { type Locator, type Page } from "@playwright/test";

export class ProductCount {
  readonly statuscount: Locator;

  constructor(page: Page) {
    this.statuscount = page.locator(".pc-price");
  }

  async countProduct() {
    await this.statuscount.first().waitFor();
    console.log(await this.statuscount.count());

    const count = await this.statuscount.count();

    return count;

    for (let i = 0; i < count; i++) {
      console.log(i + 1, await this.statuscount.nth(i).textContent());
    }
  }
}
