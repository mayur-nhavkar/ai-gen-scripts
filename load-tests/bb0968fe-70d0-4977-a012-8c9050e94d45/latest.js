import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseURL = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseURL}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartData = {};
    res = http.post(`${baseURL}/api/v1/cart`, JSON.stringify(createCartData), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    let cart_id = 1; // Replace with a dynamic value if needed
    res = http.get(`${baseURL}/api/v1/cart/${cart_id}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Checkout
    let checkoutData = {};
    res = http.post(`${baseURL}/api/v1/checkout`, JSON.stringify(checkoutData), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    let user_id = 1; // Replace with a dynamic value if needed
    res = http.get(`${baseURL}/api/v1/orders/${user_id}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    let sku = 'example-sku'; // Replace with a dynamic value if needed
    res = http.get(`${baseURL}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}