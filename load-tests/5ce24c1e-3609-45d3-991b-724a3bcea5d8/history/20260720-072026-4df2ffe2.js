import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart - Assuming cart_id is 1
    res = http.get(`${baseUrl}/api/v1/cart/1`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders - Assuming user_id is 1
    res = http.get(`${baseUrl}/api/v1/orders/1`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product by Sku - Assuming sku is 'example-sku'
    res = http.get(`${baseUrl}/api/v1/products/example-sku`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    const checkoutBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}