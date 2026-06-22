import { expect, type Locator, type Page } from "@playwright/test";

export class Searching {
  readonly page: Page;
  readonly searchbox: Locator;
  readonly searchbutton: Locator;
  readonly notfound: Locator;

  constructor(page: Page) {
    this.searchbox = page.getByPlaceholder("Smart Search");
    this.searchbutton = page.locator(`div.relative > button.absolute > svg`);
    this.page = page;
    this.notfound = page.getByText("No products found", { exact: true });
  }

  async searchItem(name: string) {
    await this.searchbox.fill(name);
  }

  async searchButtonCLick() {
    await this.searchbutton.click();
  }

  productNameVisible(names: string) {
    return this.page.locator(".pc-name").filter({ hasText: names });
  }

  async productVisible(name: string) {
    await expect(this.page.locator(".pc-name")).toBeVisible();
    console.log(await this.page.locator(".pc-name").allTextContents());
    console.log(name);

    await expect(this.productNameVisible(name)).toBeVisible();
    await expect(this.productNameVisible(name)).toContainText(name.trim());
  }

  async productNotVisible() {
    await expect(this.notfound).toBeVisible();
  }
}
