const { test, expect } = require('@playwright/test');


test.describe('Main Page', () => {
    test.beforeEach('Home Page', async ({ page }) => {
        await page.goto('https://findbanquet.com/');
    });

    test('Searching the Shop', async ({ page }) => {
        const serviceName = 'test'
        await page.getByRole('textbox').fill(serviceName)
        const suggestion = page.getByText(serviceName, { exact: true }).first();
        const noResult = page.getByText('No results found')
        if (await noResult.count() > 0) {
            await expect(noResult).toBeVisible();
        }
        else if (await suggestion.count() > 0) {
            await expect(suggestion).toBeVisible();
            await suggestion.click();
            const url = serviceName.toLowerCase().replace(/\s+/g, '-')
            await expect(page).toHaveURL(new RegExp(`${url}`))

        }
        else {
            throw new Error('No result')
        }
    })

    test('Popular Categories', async ({ page }) => {

        const categories = ['Anchors', 'Astrologer', 'Auditorium', 'Bakery', 'Banquet Hall', 'Bars', 'Catering',
            'Conference Rooms', 'Dance Class', 'Decorators', 'Farm Houses', 'Fashion', 'flowers', 'Health and wellness',
            'Homestay', 'Hotels', 'Jewellery', 'Makeup Artist', 'Mehendi', 'Music Band', 'Photographer', 'Planner',
            'Resort', 'Restaurants', 'Security', 'Seminar Halls', 'Unique Venues', 'Waiters'
        ]
        for (let i of categories) {
            await expect(page.getByAltText(`${i}`).first()).toBeVisible()
        }

    })


    test('Categories Header Section', async ({ page }) => {
        const categories = ['Mehendi', 'Makeup Artist', 'Makeup Artist', 'Banquet Hall', 'Fashion'
            , 'Resort', 'Hotel', 'Restaurants', 'Photographer', 'Decorators']

        for (let i of categories) {
            await expect(page.getByAltText(`${i}`).first()).toBeVisible()
        }

    })

    test('Quick Links', async ({ page }) => {
        const links = ['Home', 'About Us', 'How it works', 'Contact Us', 'Gallery', 'Blog']
        for (let i of links) {
            const linker = page.getByRole('link', { name: i })
            await expect(linker).toBeVisible()
        }
    })


    //to iterate or visit every link
    test('Footer Section Link', async ({ page }) => {
        const links = [
            {
                name: 'Home',
                url: '/'

            },
            {
                name: 'About Us',
                url: '/about-us'

            },
            {
                name: 'How it Works',
                url: '/how-it-work'

            },

            {
                name: 'Contact Us',
                url: '/contact'
            },

            {
                name: 'Gallery',
                url: '/gallery'

            }
        ]
        for (let i of links) {
            const linker = page.getByRole('link', { name: (i.name) }).first()
            await expect(linker).toBeVisible()
            await linker.click()
            await expect(page).toHaveURL(`https://findbanquet.com${i.url}`)
            await page.goBack()
            await page.goto('https://findbanquet.com');
            await page.waitForLoadState('domcontentloaded')
            await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
        }
    })


    // to trigger a event for the new page 
    test.only('Download App link ', async ({ page }) => {
        const [appPage] = await Promise.all([page.context().waitForEvent('page'),
        await page.getByRole('link', { name: 'App Store Download on iOS' }).click()])
        await expect(appPage).toHaveURL("https://apps.apple.com/in/app/find-banquet/id1547801752")

        const [androidPage] = await Promise.all([page.context().waitForEvent('page'),
        await page.getByRole('link', { name: 'Google Play Get it on Android' }).click()])
        await expect(androidPage).toHaveURL('https://play.google.com/store/apps/details?id=com.findbanquet&hl=en_IN')

    })


})