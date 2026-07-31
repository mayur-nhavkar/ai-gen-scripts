import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const base = 'http://sample_app:8002';
  let res = http.get(`${base}/search`, { headers: {}, tags: { endpoint: "/search" } });
  check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
  sleep(1);
}