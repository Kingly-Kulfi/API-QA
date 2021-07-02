import http from 'k6/http';
import {
  check,
  randomSeed,
  sleep,
} from 'k6';
export let options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '1m', target: 1000 },
    { duration: '15s', target: 2000 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['avg < 20', 'p(95) < 50', 'max < 150'],
  }
};
const localhost = 'http://localhost:3000';
randomSeed(0);
export default function () {
  const max = 1000000;
  let product_id = Math.floor(Math.random() * max) || 1;
  let res = http.get(`${localhost}/qa/questions?product_id=${product_id}`, {
    tags: { name: 'GetQuestionsForProduct' },
  });
  check(res, {
    'response code was 200': (res) => res.status === 200,
    'response duration < 150ms ': (res) => res.timings.duration < 150,
  });
  sleep(1);
}