import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/' } };

    // Health Check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartPayload = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Assuming a cart_id for demonstration
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    const userId = 1; // Assuming a user_id for demonstration
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku
    const sku = 'example-sku'; // Assuming a SKU for demonstration
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}