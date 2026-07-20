import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = {};

    // Health check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartBody), { ...params, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart (replace {cart_id} with a placeholder for demonstration)
    const cartId = 1; // Example cart_id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders (replace {user_id} with a placeholder for demonstration)
    const userId = 1; // Example user_id
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku (replace {sku} with a placeholder for demonstration)
    const sku = 'example-sku'; // Example sku
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}