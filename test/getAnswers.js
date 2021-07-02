import http from 'k6/http';
import {
  check,
  randomSeed,
  sleep,
} from 'k6';
export let options = {
  stages: [
    { duration: '20s', target: 300 },
    { duration: '1m', target: 1000 },
    { duration: '15s', target: 2000 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['avg < 10', 'p(95) < 20', 'max < 150'],
  }
};
const localhost = 'http://localhost:3000';
randomSeed(0);
export default function () {
  const max = 1000000;
  let question_id = Math.floor(Math.random() * max) || 1;
  let res = http.get(`${localhost}/qa/questions/${question_id}/answers`, {
    tags: { name: 'GetAnswersForQuestion' }
  });
  check(res, {
    'response code was 200': (res) => res.status === 200,
    'response duration < 150ms ': (res) => res.timings.duration < 150,
  });
  sleep(1);
}