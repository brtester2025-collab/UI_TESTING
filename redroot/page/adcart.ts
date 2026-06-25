import { Locator, Page } from "@playwright/test";

export class AdChart {
    readonly add_button: Locator;
    readonly cartclick: Locator;

    constructor(page: Page) {
        this.add_button = page.getByRole("button", { name: "ADD TO CART" })
            .first();
        this.cartclick = page.locator(
            ".lucide.lucide-shopping-cart-icon.lucide-shopping-cart",
        );
    }

    async addtoCart() {
        this.add_button.click();
    }

    async cartViewSection() {
        this.cartclick.click();
    }
}
