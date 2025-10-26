import { expect } from '@playwright/test'

class PageLogin {

    constructor(page) {
        this.page = page
        this.inputUsername = page.getByRole('textbox', { name: 'Username' })
        this.inputPassword = page.getByRole('textbox', { name: 'Password' })
        this.buttonLogin = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async submitLogin(username, password) {
        await this.page.goto('/')
        await this.inputUsername.fill(username)
        await this.inputPassword.fill(password)
        await this.buttonLogin.click()
    }

    async checkErrorMessage(text) {
        await expect(this.errorMessage).toHaveText(text)
    }
}

module.exports = { PageLogin }