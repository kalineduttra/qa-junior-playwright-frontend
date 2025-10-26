require('dotenv').config()

import { test, expect } from '@playwright/test'
import { PageLogin } from './page-objects/page-login.js'
import { PageProduct } from './page-objects/page-product.js'

let pageLogin
let pageProduct

const { USERNAME, PASSWORD } = process.env

test.describe('o usuário está na página de produtos', () => {
  test.beforeEach(async ({ page }) => {
    pageLogin = new PageLogin(page)
    pageProduct = new PageProduct(page)
    await pageLogin.submitLogin(USERNAME, PASSWORD)
  })

  test('adiciona 02 produtos, remove 1 produto e valida qntd de itens que sobrou no carrinho', async ({ page }) => {
    const product = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']
    await expect(pageProduct.itensInCart()).toHaveCount(0)
    for (let i = 0; i < product.length; i++) {
      await pageProduct.addProductToCart(product[i])
      await expect(pageProduct.itensInCart()).toHaveText(String(i + 1))
      await pageProduct.clickCartButton()
      await pageProduct.productList(product[i]).toBeVisible()
      await page.getByRole('button', { name: 'Continue Shopping' }).click()
    }
    await expect(pageProduct.itensInCart()).toHaveText('2')
    await pageProduct.clickCartButton()
    await pageProduct.deleteProduct('Sauce Labs Backpack')
    await expect(pageProduct.itensInCart()).toHaveText('1')
  })
})