require('dotenv').config()

import { test, expect } from '@playwright/test'
import { PageLogin } from './page-objects/page-login.js'
import { PageBuy } from './page-objects/page-buy.js'

let pageLogin
let pageBuy

const { USERNAME, PASSWORD } = process.env

test.describe('Valida compras', () => {
  test.beforeEach(async ({ page }) => {
    pageLogin = new PageLogin(page)
    pageBuy = new PageBuy(page)
    await pageLogin.submitLogin(USERNAME, PASSWORD)
  })

test('adiciona 02 produtos e faz uma compra com sucesso no site', async ({ page }) => {
    const products = [
        'Sauce Labs Backpack', 
        'Sauce Labs Bike Light'
    ]
    for (const product of products) {
        await pageBuy.addProductToCart(product)
    }
    await pageBuy.goToCart()
    await pageBuy.checkout()
    await pageBuy.fillCheckoutInformation('nome', 'sobrenome', 'numero')
    await pageBuy.finishCheckout()
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!')
  })
})