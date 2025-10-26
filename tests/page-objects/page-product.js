import { expect } from '@playwright/test'

class PageProduct {

    constructor(page) {
        this.page = page
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.cartItem = page.locator('[data-test="inventory-item"]')
        this.cartList = page.locator('[data-test="cart-list"]')   
    }

    async addProductToCart(product) {
        const productSelector = this.cartItem.filter({
            hasText: product,
        })
        await productSelector.getByRole('button', { name: 'Add to cart' }).click()
    }

    itensInCart() {
        return this.cartBadge
    }

    async clickCartButton() {
        await this.cartButton.click()
    }

    productList(product) {
        return expect(this.cartList.filter({ hasText: product}))
    }

    async deleteProduct (product) {
        await this.page.locator('.cart_item', { hasText: product }).getByRole('button', { name: 'Remove' }).click()
        await this.cartList.filter({ hasText: product}).isHidden()
    }

}

module.exports = { PageProduct }