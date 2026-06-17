import { type Page, type Locator, expect } from "@playwright/test";

export class loginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginClick: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder("Enter Username");
    this.password = page.getByPlaceholder("Enter Password");
    this.loginClick = page.getByRole("button", { name: "Login" });
  }
  async goto() {
    await this.page.goto("https://letcode.in/login");
    console.log("i am url");
  }

  async LoginPage(name: string, code: string) {
    await this.username.fill(name);
    await this.password.fill(code);
    console.log("i am login Page");
  }

  async clickButton() {
    await this.loginClick.click();
    await expect(this.page).toHaveURL("https://letcode.in/home");
    console.log("expected result");
  }
}
