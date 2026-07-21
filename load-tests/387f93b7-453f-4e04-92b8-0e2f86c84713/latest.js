import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    let createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart
    const cartId = 1;  // Assume we have a cart ID
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders
    const userId = 1;  // Assume we have a user ID
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Product By SKU
    const sku = 'example-sku';  // Assume we have a SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Checkout
    let checkoutBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}