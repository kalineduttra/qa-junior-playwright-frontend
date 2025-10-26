require('dotenv').config()

import { test, expect } from '@playwright/test'
import { PageLogin } from './page-objects/page-login.js'

let pageLogin
const { USERNAME, PASSWORD } = process.env

const requiredErrorMessage = (field) => {
  return `Epic sadface: ${field} is required`;
}

test.describe('Valida autenticação do usuário', () => {
  test.beforeEach(async ({ page }) => {
    pageLogin = new PageLogin(page)
  })
  test('Usuário é autenticado com sucesso', async ({ page }) => {
    await pageLogin.submitLogin(USERNAME, PASSWORD) 
    await expect(page).toHaveURL('/inventory.html') 
  })
  test('Preenche formulário com credenciais inválidas e valida mensagem de erro', async ({ page }) => {
    await pageLogin.submitLogin('user', 'password')
    await pageLogin.checkErrorMessage('Epic sadface: Username and password do not match any user in this service')
  })
  test('Submete o formulário de login sem preencher as credenciais', async ({ page }) => {
    await pageLogin.submitLogin('', '')
    await pageLogin.checkErrorMessage(requiredErrorMessage('Username'))
  })
  test('Preenche somente o campo username', async ({ page }) => {
    await pageLogin.submitLogin(USERNAME, '')
    await pageLogin.checkErrorMessage(requiredErrorMessage('Password'))
  })
  test('Preenche somente o campo password', async ({ page }) => {
    await pageLogin.submitLogin('', PASSWORD)
    await pageLogin.checkErrorMessage(requiredErrorMessage('Username'))
  })
})