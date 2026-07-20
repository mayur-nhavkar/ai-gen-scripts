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
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    const cart_id = 1; // example cart_id
    res = http.get(`${baseUrl}/api/v1/cart/${cart_id}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    const user_id = 1; // example user_id
    res = http.get(`${baseUrl}/api/v1/orders/${user_id}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku
    const sku = 'example-sku'; // example SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    const checkoutPayload = {};
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}