import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const base = 'http://host.docker.internal:8000';
  let res = http.post(`${base}/api/v1/cart`, "{}", { headers: {}, tags: { endpoint: "/api/v1/cart" } });
  check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
  sleep(1);
}