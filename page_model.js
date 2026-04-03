import { browser } from "k6/browser";
import { scenario } from "k6/execution";


export const options = {
    scenarios: {
        user: {
            exec: 'userLogin',
            executor: 'shared-iterations',
            vus: 1,
            iterations: 5,
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
}



export async function userLogin() {
    const page = await browser.newPage()
    page.on('response', (res) => {
        if (res.status() >= 400) {
            console.log(`Failed: ${res.url()} -> ${res.status()}`);
        }
    });
    try {
        await page.goto('https://www.saucedemo.com', {
            waitUntil: 'networkidle',
        });

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();

    } finally {
        await page.close();
    }
}
