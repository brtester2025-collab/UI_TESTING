import http from "k6/http";
import { check, group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js";

export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],

  threshold: {
    http_req_duration: ["p(95) < 300"],
  },
};

export const TrafficModel = {
  home: 0.6,
  stats: 0.5,
};
export default function () {
  const random = Math.random();
  const link = http.get("https://jsonplaceholder.typicode.com/posts");

  if (random < TrafficModel.home)
    group("Login status for the user", () => {
      check(link, {
        "status should": (res) => res.status === 200,
        "response time < 1000ms": (res) => res.timings.duration < 1000,
      });
    });
  else {
    group("Blog visit duration", () => {
      check(link, {
        "Blog reading updates": (res) => res.status === 200,
      });
    });
  }
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
