const { test, expect } = require('@playwright/test')

test.describe('Main Page', () => {
    test.beforeEach('Home Page', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
    });

    test('Popular Categories', async ({ page }) => {
        await expect(page.getByAltText('Anchors')).toBeVisible()
        await expect(page.getByAltText('Astrologer')).toBeVisible()
        await expect(page.getByAltText('Auditorium')).toBeVisible()
        await expect(page.getByAltText('Bakery')).toBeVisible()
        await expect(page.getByAltText('Banquet Hall')).toBeVisible()
        await expect(page.getByAltText('Bars')).toBeVisible()
        await expect(page.getByAltText('Catering')).toBeVisible()
        await expect(page.getByAltText('Conference Rooms')).toBeVisible()
        await expect(page.getByAltText('Dance Class')).toBeVisible()
        await expect(page.getByAltText('Decorators')).toBeVisible()
        await expect(page.getByAltText('Farm Houses')).toBeVisible()
        await expect(page.getByAltText('Fashion').first()).toBeVisible()
        await expect(page.getByAltText('flowers')).toBeVisible()
        await expect(page.getByAltText('Health and wellness')).toBeVisible()
        await expect(page.getByAltText('Homestay')).toBeVisible()
        await expect(page.getByAltText('Hotels')).toBeVisible()
        await expect(page.getByAltText('Jewellery')).toBeVisible()
        await expect(page.getByAltText('Makeup Artist').first()).toBeVisible()
        await expect(page.getByAltText('Mehendi')).toBeVisible()
        await expect(page.getByAltText('Music Band')).toBeVisible()
        await expect(page.getByAltText('Music DJ')).toBeVisible()
        await expect(page.getByAltText('Photographer')).toBeVisible()
        await expect(page.getByAltText('Planner')).toBeVisible()
        await expect(page.getByAltText('Resort').first()).toBeVisible()
        await expect(page.getByAltText('Restaurants')).toBeVisible()
        await expect(page.getByAltText('Security')).toBeVisible()
        await expect(page.getByAltText('Seminar Halls')).toBeVisible()
        await expect(page.getByAltText('Unique Venues')).toBeVisible()
        await expect(page.getByAltText('Waiters')).toBeVisible()
    })

    test('Quick Links', async ({ page }) => {
        const home = page.getByRole('link', { name: 'Home' })
        const About = page.getByRole('link', { name: 'About Us' })
        const work = page.getByRole('link', { name: 'How it works' })
        const gallery = page.getByRole('link', { name: 'Gallery' })

        await expect(home).toBeVisible()
        await expect(About).toBeVisible()
        await expect(work).toBeVisible()
        await expect(gallery).toBeVisible()

    })

    test('Home link', async ({ page }) => {
        await page.getByRole('link', { name: 'Home' }).click();
        await expect(page).toHaveURL('https://findbanquet.com/')

    })
    test('About link', async ({ page }) => {
        await page.getByRole('link', { name: 'About Us' }).click();
        await expect(page).toHaveURL('https://findbanquet.com/about-us')

    })

    test('how it works link', async ({ page }) => {
        await page.getByRole('link', { name: 'How it works' }).click();
        await expect(page).toHaveURL('https://findbanquet.com/how-it-work')

    })

    test('Contact us link', async ({ page }) => {
        await page.getByRole('link', { name: 'Contact Us' }).click();
        await expect(page).toHaveURL('https://findbanquet.com/contact')

    })

    test('Gallery', async ({ page }) => {
        await page.getByRole('link', { name: 'Gallery' }).click();
        await expect(page).toHaveURL('https://findbanquet.com/gallery')

    })
})