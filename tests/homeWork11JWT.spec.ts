import { test, expect } from '@playwright/test'
import { LoginDto } from './dto/Login-Dto'
import { StatusCodes } from 'http-status-codes'

const authURL = 'https://backend.tallinn-learning.ee/login/student'
const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
test('Test checks positive scenario when user credentials matching', async ({ request }) => {
  const loginData = LoginDto.createLoginWithCorrectCredential()
  console.log('login Data', loginData)
  const response = await request.post(authURL, {
    data: loginData,
  })
  const responseBody = await response.text()
  console.log('Response code: ', response.status())
  console.log('Response Body', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toMatch(jwtRegex)
})
test('Test checks negative scenario when user credentials ae wrong', async ({ request }) => {
  const loginData = LoginDto.createLoginWithIncorrectCredential()
  const response = await request.post(authURL, {
    data: loginData,
  })
  const responseBody = await response.text()
  console.log('Response code: ', response.status())
  console.log('Response Body', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
