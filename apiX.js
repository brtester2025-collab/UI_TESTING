import { check } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "5s",

  thresholds: {
    http_req_duration: ["p(95)<150"],
    http_req_failed: ["rate<0.01"],
  },
};

export default async () => {
  const url = http.get("https://pokeapi.co/api/v2/region");

  const data = url.json();

  check(url, {
    "Response status": (res) => res.status === 200,
  });

  check(data, {
    "Name the region": (res) => res.results[0].name === "kanto",
  });
};
