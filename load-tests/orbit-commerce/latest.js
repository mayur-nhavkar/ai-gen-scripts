import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const base = 'http://sample_app:8002';
  let res = http.get(`${base}/api/v1/orders/1`, { headers: {}, tags: { endpoint: "/api/v1/orders/1" } });
  check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
  sleep(1);
}