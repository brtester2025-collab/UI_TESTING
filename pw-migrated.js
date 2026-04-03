import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';
import { browser } from 'k6/browser';

export const options = {
    scenarios: {
        user: {
            exec: 'userLogin',
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
        admin: {
            exec: 'adminLogin',
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export async function adminLogin() {
    const page = await browser.newPage();

    await page.goto('https://quickpizza.grafana.com/admin', {
        waitUntil: 'networkidle',
    });

    await page.getByLabel('username').fill('admin');
    await page.getByLabel('password').fill('admin');
    await page.getByRole('button', { name: 'Sign in' }).click()

    await page.getByRole('button', { name: 'Logout' }).waitFor()

    const label = page.locator('h2')
    const textContent = await label.textContent()
    expect(textContent).toEqual('Latest pizza recommendations');
}

export async function userLogin() {
    const page = await browser.newPage();

    await page.goto('https://quickpizza.grafana.com/login', {
        waitUntil: 'networkidle',
    });

    await page.getByLabel('username').fill('default');
    await page.getByLabel('password').fill('12345678');
    await page.getByText('Sign in').click();

    await page.getByRole('button', { name: 'Logout' }).waitFor()

    const label = page.locator('h2')
    const textContent = await label.textContent()
    expect(textContent).toEqual('Your Pizza Ratings:');
}