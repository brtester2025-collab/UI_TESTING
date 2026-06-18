import { type Page, type Locator } from "@playwright/test";

export class HomePageLogin {
  readonly page: Page;
  readonly pageVerification: Locator;
  readonly storeSelection: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly register: Locator;
  readonly emailandPasswordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageVerification = page.locator(".get-verified");
    this.storeSelection = page.locator(".shop-btn").first();
    this.register = page.locator('a[href="/login"]');
    this.username = page.locator("#signin-email");
    this.password = page.locator("#signin-password");
    this.loginButton = page.getByRole("button", { name: "Sign In" });
    this.emailandPasswordError = page.getByText(
      " Email or Mobile Number is required",
    );
  }

  async goto() {
    await this.page.goto("https://redrootstrading.ca");
  }
  async verification() {
    await this.pageVerification.click();
  }

  async storeName() {
    await this.storeSelection.click();
  }

  async registerClick() {
    await this.page.goto("https://redrootstrading.ca/login");
  }

  async loginData(nam: string, pass: string) {
    console.log(this.page.url());
    await this.username.fill(nam);
    await this.password.fill(pass);
  }

  async signClick() {
    await this.loginButton.click();
  }
}
