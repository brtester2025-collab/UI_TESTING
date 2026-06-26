import { Locator, Page } from "@playwright/test";

export class AdChart {
  readonly page: Page;
  readonly add_button: Locator;
  readonly cartclick: Locator;
  readonly addmsg: Locator;
  readonly countP: Locator;

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
  }
  async cartViewSection() {
    this.cartclick.click();
  }

  async addtoCart() {
    await this.page.waitForLoadState("networkidle");
    await this.add_button.click();
  }

  async message() {
    await this.addmsg.isVisible();
  }

  async productCount() {
    const counter = await this.countP.textContent();
    return counter;
  }
}
