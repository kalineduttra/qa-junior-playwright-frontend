import { expect } from '@playwright/test'

class PageBuy {
    constructor(page) {
        this.page = page
        this.inputUsername = page.getByRole('textbox', { name: 'Username' })
        this.inputPassword = page.getByRole('textbox', { name: 'Password' })
        this.buttonLogin = page.getByRole('button', { name: 'Login' })
        this.errorMessage = page.locator('[data-test="error"]')
    }

    async addProductToCart(productName) {
        const productItem = this.page.locator('.inventory_item', { hasText: productName })
        const addToCartButton = productItem.locator('button', { hasText: 'Add to cart' })
        await addToCartButton.click()
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click()
    }

    async checkout() {
        await this.page.locator('[data-test="checkout"]').click()
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.page.locator('[data-test="firstName"]').fill(firstName)
        await this.page.locator('[data-test="lastName"]').fill(lastName)
        await this.page.locator('[data-test="postalCode"]').fill(postalCode)
        await this.page.locator('[data-test="continue"]').click()
    }

    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click()
    }

    getCartBadge() {
        return this.page.locator('.shopping_cart_badge')
    }

    async checkErrorMessage(text) {
        await expect(this.errorMessage).toHaveText(text)
    }
}

module.exports = { PageBuy }