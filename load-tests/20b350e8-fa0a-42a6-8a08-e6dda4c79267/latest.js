import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Create a cart
    let createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get cart (assuming cart_id is 1)
    res = http.get(`${baseUrl}/api/v1/cart/1`, { tags: { endpoint: '/api/v1/cart/1' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // List orders (assuming user_id is 1)
    res = http.get(`${baseUrl}/api/v1/orders/1`, { tags: { endpoint: '/api/v1/orders/1' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Get product by SKU (assuming sku is '12345')
    res = http.get(`${baseUrl}/api/v1/products/12345`, { tags: { endpoint: '/api/v1/products/12345' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Checkout
    let checkoutBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/checkout' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}