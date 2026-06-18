import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",

  thresholds: {
    // Add:
    // P95 < 500ms
    // Failure rate < 1%

    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const profile = http.get("https://jsonplaceholder.typicode.com/users/1");

  check(profile, {
    status: (res) => res.status === 200,
  });

  const posts = http.get("https://jsonplaceholder.typicode.com/posts");

  check(posts, {
    // status 200
    status2: (res) => res.status === 200,
  });

  sleep(2);
}
