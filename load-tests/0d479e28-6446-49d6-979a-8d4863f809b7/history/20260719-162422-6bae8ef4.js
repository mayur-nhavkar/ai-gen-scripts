import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health check
    let res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    let createCartPayload = {};
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Example cart ID
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    let userId = 1; // Example user ID
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product by SKU
    let sku = 'example-sku'; // Example SKU
    res = http.get(`http://sample_app:8002/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}