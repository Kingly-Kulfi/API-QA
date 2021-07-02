import http from 'k6/http';
import {
  check,
  randomSeed,
  sleep,
} from 'k6';
export let options = {
  stages: [
    { duration: '10s', target: 300 },
    { duration: '1m', target: 1000 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<30', 'max < 150'],
  }
};
const localhost = 'http://localhost:3000';
randomSeed(0);
export default function () {
  const max = 1000000;
  let id = Math.floor(Math.random() * max) || 1;
  let res = http.put(`${localhost}/qa/answers/${id}/helpful`, {
    tags: { name: 'MarkAnswerHelpful' }
  });
  check(res, {
    'response code was 204': (res) => res.status === 204,
    'response duration < 150ms ': (res) => res.timings.duration < 150,
  });
  sleep(1);
}