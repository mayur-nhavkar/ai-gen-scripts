import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };

    // Healthz
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart (assuming cart_id = 1)
    params.tags.endpoint = '/api/v1/cart/1';
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Recent Orders
    params.tags.endpoint = '/api/v1/orders/recent';
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    const checkoutBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Products Low Stock
    params.tags.endpoint = '/api/v1/products/low-stock';
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}