import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };

    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/cart' };
    const createCartBody = JSON.stringify({ /* Example payload for CartCreate */ });
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/orders/recent' };
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/products/low-stock' };
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/carts/by-user/1' };
    res = http.get(`${baseUrl}/api/v1/carts/by-user/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}