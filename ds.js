import http from "k6/http";
import { check, sleep, group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.1.0/index.js";

// const TrafficUserModel = {
//   Home: 0.4,
//   Blog: 0.6,
// };

export const options = {
  threshold: {
    http_req_duration: ["p(95)<400"],
  },

  stages: [
    {
      duration: "30s",
      target: 5,
    },
    {
      duration: "30s",
      target: 100,
    },
    {
      duration: "30s",
      target: 1000,
    },
    {
      duration: "30",
      target: 0,
    },
  ],
};

export default function () {
  const response = http.get("https://redrootstrading.ca/");

  const link = http.get("https://redrootstrading.ca/blogs");

  const random = Math.random();

  // if (random < TrafficUserModel.Home + TrafficUserModel.Blog)
  group("Home page Visit", () => {
    check(response, {
      "status is 200 ": (obj) => obj.status === 200,
      "res time < 400ms": (obj) => obj.timings.duration < 400,
    });
  });

  group("Blog page Visit", () => {
    check(link, {
      "status must be True": (res) => res.status === 200,
    });
  });

  // group("Go the login page", () => {
  //   check(data, {
  //     "check the status is present": (res) => res.status === 404,
  //   });
  // });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
