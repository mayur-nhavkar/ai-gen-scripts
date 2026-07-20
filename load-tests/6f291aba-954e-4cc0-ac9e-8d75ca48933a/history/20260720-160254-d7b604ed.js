import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartPayload = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart (replace {cart_id} with a plausible cart_id, e.g., 1)
    res = http.get(`${baseUrl}/api/v1/cart/1`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders (replace {user_id} with a plausible user_id, e.g., 1)
    res = http.get(`${baseUrl}/api/v1/orders/1`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku (replace {sku} with a plausible sku, e.g., '12345')
    res = http.get(`${baseUrl}/api/v1/products/12345`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Html Index
    res = http.get(`${baseUrl}/?user_id=1`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}