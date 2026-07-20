import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const cartId = 1; // Example cart_id
    const userId = 1; // Example user_id
    const sku = 'example_sku'; // Example SKU

    const createCartBody = {
        // Fill with plausible data if schema provided
    };

    const checkoutBody = {
        // Fill with plausible data if schema provided
    };

    let res;

    // Health Check
    res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartBody), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutBody), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // List Orders
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}