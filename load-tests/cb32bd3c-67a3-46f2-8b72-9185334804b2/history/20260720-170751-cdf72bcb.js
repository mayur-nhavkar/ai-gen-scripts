import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const cartId = 1; // Example cart ID
    const userId = 1; // Example user ID
    const sku = 'example-sku'; // Example SKU for product

    // Health check
    const res1 = http.get(`${baseUrl}/healthz`);
    check(res1, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    const res2 = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } });
    check(res2, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    const res3 = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res3, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product by SKU
    const res4 = http.get(`${baseUrl}/api/v1/products/${sku}`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res4, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    const res5 = http.get(`${baseUrl}/api/v1/orders/${userId}`, { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res5, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    const checkoutBody = JSON.stringify({});
    const res6 = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/checkout' } });
    check(res6, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}