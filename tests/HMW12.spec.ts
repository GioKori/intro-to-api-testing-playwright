import { expect, test } from '@playwright/test'
import { LoginDto } from './dto/Login-Dto'
import { OrderDto } from './dto/Order-Dto'
import { StatusCodes } from 'http-status-codes'

const orderURL = 'https://backend.tallinn-learning.ee/orders'
const loginUrl = 'https://backend.tallinn-learning.ee/login/student'
const Customer_Name = 'Giorgi'
const Customer_Phone = '111111111'
const Comment = 'Lets get Started!'
const ID = 3

test('Create new order', async ({ request }) => {
  const loginData = LoginDto.createLoginWithCorrectCredential()
  const response = await request.post(loginUrl, {
    data: loginData,
  })
  const jwt = await response.text()
  console.log(jwt)
  const orderDto = new OrderDto('OPEN', 1, Customer_Name, Customer_Phone, Comment, ID)
  const apiOrderResponse = await request.post(orderURL, {
    data: orderDto,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  console.log(apiOrderResponse.status())
  const orderJsonResponse = await apiOrderResponse.json()
  console.log(orderJsonResponse)
  expect(orderJsonResponse.id).toBeDefined()
  expect(orderJsonResponse.customerName).toBe(Customer_Name)
  expect(orderJsonResponse.customerPhone).toBe(Customer_Phone)

  const orderId = orderJsonResponse.id
  console.log(orderId)

  const apiGetOrderResponse = await request.get(orderURL + '/' + orderId, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  console.log(apiGetOrderResponse.status())
  const GetOrderJson = await apiGetOrderResponse.json()
  console.log(GetOrderJson)

  const deleteOrder = await request.delete(`${orderURL}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const deleteOrderResp = await deleteOrder.json()
  console.log(deleteOrderResp)
  expect(deleteOrder.status()).toBe(StatusCodes.OK)
})
