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
  
    // Get Cart
    const cartId = 1; // Example cart ID
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    // List Orders
    const userId = 1; // Example user ID
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    // Get Product by SKU
    const sku = 'example-sku'; // Example SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    // Checkout
    const checkoutPayload = {};
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}