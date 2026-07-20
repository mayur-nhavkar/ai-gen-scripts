import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Check Healthz
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartBody), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get Cart (using a dummy cart_id)
    const cartId = 1; // Placeholder value
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Checkout
    const checkoutBody = {};
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutBody), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // List Orders (using a dummy user_id)
    const userId = 1; // Placeholder value
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Get Product By Sku (using a dummy sku)
    const sku = "example-sku"; // Placeholder value
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}