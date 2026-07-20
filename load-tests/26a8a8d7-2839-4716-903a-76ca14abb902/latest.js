import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseURL = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseURL}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseURL}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart
    const cartId = 1; // Example cart ID
    res = http.get(`${baseURL}/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders
    const userId = 1; // Example user ID
    res = http.get(`${baseURL}/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Product By Sku
    const sku = 'example-sku'; // Example SKU
    res = http.get(`${baseURL}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Checkout
    const checkoutBody = JSON.stringify({});
    res = http.post(`${baseURL}/api/v1/checkout`, checkoutBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}