import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseURL = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseURL}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseURL}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get Cart (Assuming a cart_id of 1)
    res = http.get(`${baseURL}/api/v1/cart/1`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // List Orders (Assuming a user_id of 1)
    res = http.get(`${baseURL}/api/v1/orders/1`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Get Product By Sku (Assuming a sku of 'sample-sku')
    res = http.get(`${baseURL}/api/v1/products/sample-sku`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Checkout
    const checkoutBody = JSON.stringify({});
    res = http.post(`${baseURL}/api/v1/checkout`, checkoutBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}