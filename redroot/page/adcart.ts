import { Locator, Page, expect } from "@playwright/test";

export class AdChart {
  readonly page: Page;
  readonly add_button: Locator;
  readonly cartclick: Locator;
  readonly addmsg: Locator;
  readonly countP: Locator;
  readonly no_msg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.add_button = page.getByRole("button", { name: "ADD TO CART" }).first();
    this.cartclick = page.locator(
      ".lucide.lucide-shopping-cart-icon.lucide-shopping-cart",
    );
    this.addmsg = page.getByRole("heading", {
      name: "Added to Cart",
      level: 2,
    });

    this.countP = page.locator(".count");
    this.no_msg = page.getByRole("heading", {
      name: "No products found",
      level: 2,
    });
  }
  async cartViewSection() {
    this.cartclick.click();
  }

  async addtoCart() {
    // await this.page.waitForLoadState("networkidle", { timeout: 10000000 });
    await this.add_button.click();
  }

  async message() {
    await expect(this.addmsg).toBeVisible();
  }

  async notFound() {
    await this.no_msg.isVisible();
  }

  async productCount() {
    const counter = await this.countP.textContent();
    return counter;
  }
}
