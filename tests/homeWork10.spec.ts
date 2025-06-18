import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { RiskAssesment } from './dto/risk-dto'

test('Test checks positive scenario for giving loan for low risk user', async ({ request }) => {
  const userData = new RiskAssesment(3500, 0, 29, true, 230, 12)
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    { data: userData },
  )
  expect(response.status()).toBe(StatusCodes.OK)
  const data = await response.json()
  console.log(data)
})

test('Test checks positive scenario for giving loan for medium risk user', async ({ request }) => {
  const userData = new RiskAssesment(2000, 0, 20, true, 600, 9)
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    { data: userData },
  )
  expect(response.status()).toBe(StatusCodes.OK)
  const data = await response.json()
  console.log(data)
})
test('Test checks negative scenario for giving loan for user', async ({ request }) => {
  const userData = new RiskAssesment(150, 1000, 29, true, 2300, 12)
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    { data: userData },
  )
  expect(response.status()).toBe(StatusCodes.OK)
  const data = await response.json()
  console.log(data)
})
