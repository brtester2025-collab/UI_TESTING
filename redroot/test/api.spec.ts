import { test, expect } from "@playwright/test";

test("API test cases", async ({ request }) => {
  const data = await request.get("https://pokeapi.co/api/v2/pokemon");
  console.log(await data.json());
  console.log(data.status());
  expect(data.status()).toBe(200);
  console.log("----------------API WORKING----------------");
});
