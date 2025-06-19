import { expect, test } from "@playwright/test";

import { StatusCodes } from "http-status-codes";

test("Get order with correct id should receive code 200", async ({
  request,
}) => {
  const response = await request.get(
    "https://backend.tallinn-learning.ee/test-orders/2",
  );
  console.log("response body:", await response.json());
  console.log("response headers:", response.headers());
  expect(response.status()).toBe(200);
});

test("Get order with incorrect id should receive code 400", async ({
  request,
}) => {
  const response = await request.get(
    "https://backend.tallinn-learning.ee/test-orders/13",
  );
  console.log("response body:", await response.json());
  console.log("response headers:", response.headers());
  // Check if the response status is 200
  expect(response.status()).toBe(400);
});

test("Delete order with correct ID should receive code 204", async ({
  request,
}) => {
  const requestHeader = {
    api_key: "1234567890123453",
  };

  const response = await request.delete(
    "https://backend.tallinn-learning.ee/test-orders/2",
    {
      headers: requestHeader,
    },
  );
  console.log("Received status:", response.status());

  console.log("response headers:", response.text());
  expect(response.status()).toBe(StatusCodes.NO_CONTENT);
});

test("Delete order with incorrect ID should receive code 400", async ({
  request,
}) => {
  const requestHeader = {
    api_key: "1234567890123453",
  };

  const response = await request.delete(
    "https://backend.tallinn-learning.ee/test-orders/0",
    {
      headers: requestHeader,
    },
  );

  console.log("Received status:", response.status());
  console.log("response headers:", response.text());
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
});

test("post order with correct data should receive code 200", async ({
  request,
}) => {
  const requestBody = {
    status: "OPEN",
    courierId: 3,
    customerName: "GK",
    customerPhone: "5544",
    comment: "put",
    id: 0,
  };
  const response = await request.post(
    "https://backend.tallinn-learning.ee/test-orders/",
    {
      data: requestBody,
    },
  );
  // Log the response status and body
  console.log("response status:", response.status());
  console.log("response body:", await response.json());
  expect(response.status()).toBe(StatusCodes.OK);
});

test("post order with incorrect data should receive code 400", async ({
  request,
}) => {
  const requestBody = {
    status: "Close",
    courierId: 3,
    customerName: "GiKo",
    customerPhone: "5544",
    comment: "put",
    id: 0,
  };
  const response = await request.post(
    "https://backend.tallinn-learning.ee/test-orders",
    {
      data: requestBody,
    },
  );
  console.log("response status:", response.status());
  console.log("response body:", await response.text());
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
});

test("put order with correct api should receive code 200", async ({
  request,
}) => {
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 0,
  };
  const requestHeader = {
    api_key: "1234567898765432",
  };
  const response = await request.put(
    "https://backend.tallinn-learning.ee/test-orders/3",
    {
      headers: requestHeader,
      data: requestBody,
    },
  );
  // Log the response status and body
  console.log("response status:", response.status());
  console.log("response body:", await response.text());
  expect(response.status()).toBe(StatusCodes.OK);
});

test("put order with incorrect api key should receive code 401", async ({
  request,
}) => {
  const requestBody = {
    status: "OPEN",
    courierId: 0,
    customerName: "string",
    customerPhone: "string",
    comment: "string",
    id: 0,
  };

  const requestHeaders = {
    api_key: "642",
  };
  // Send a PUT request to the server
  const response = await request.put(
    "https://backend.tallinn-learning.ee/test-orders/1",
    {
      data: requestBody,
      headers: requestHeaders,
    },
  );
  // Log the response status and body
  console.log("response status:", response.status());
  console.log("response body:", await response.text());
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED);
});
