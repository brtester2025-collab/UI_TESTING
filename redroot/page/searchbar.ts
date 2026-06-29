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
    await expect(this.searchbutton).toBeVisible();
    await this.searchbutton.click();
  }

  productNameVisible(names: string) {
    console.log("In search bar section ", names);
    return this.page.getByRole("link", { name: names });
  }

  async productNotVisible() {
    return this.notfound.isVisible();
  }
}
