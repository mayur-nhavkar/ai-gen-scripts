import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // GET /healthz
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': r => r.status === 200 });
    sleep(1);

    // POST /api/v1/cart
    const createCartPayload = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': r => r.status === 201 });
    sleep(1);

    // GET /api/v1/cart/1
    res = http.get(`${baseUrl}/api/v1/cart/1`, { tags: { endpoint: '/api/v1/cart/1' } });
    check(res, { 'status is 200': r => r.status === 200 });
    sleep(1);

    // POST /api/v1/checkout
    const checkoutPayload = {};
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': r => r.status === 201 });
    sleep(1);

    // GET /api/v1/orders/1
    res = http.get(`${baseUrl}/api/v1/orders/1`, { tags: { endpoint: '/api/v1/orders/1' } });
    check(res, { 'status is 200': r => r.status === 200 });
    sleep(1);

    // GET /api/v1/products/sample_sku
    res = http.get(`${baseUrl}/api/v1/products/sample_sku`, { tags: { endpoint: '/api/v1/products/sample_sku' } });
    check(res, { 'status is 200': r => r.status === 200 });
    sleep(1);
}