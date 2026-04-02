class Loginpage {
    constructor(page) {

        this.page = page
        this.username = page.locator('username')
        this.pagename = page.locator('password')
        this.loginBtn = page.locator('loginBTN')

    }
}