import { test, expect, request } from "@playwright/test";

test("API test cases", async ({ request }) => {
  const data = await request.get("https://pokeapi.co/api/v2/region");
  //   console.log(await data.json());
  const result = await data.json();

  expect(data.status()).toBe(200);
  //   expect(result.count).toBe(12);
  expect(result.results[0].name).toBe("kanto");
  expect(data).toBeOK();
  console.log("----------------API WORKING----------------");
});

test("Methods checking", async ({ request }) => {
  const d = { value: "data" };
  expect(d).toBeTruthy();
});
