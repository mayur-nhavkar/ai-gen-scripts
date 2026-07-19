import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health Check
    let res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartPayload = JSON.stringify({});
    res = http.post('http://sample_app:8002/api/v1/cart', createCartPayload, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Example cart_id
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    let userId = 1; // Example user_id
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    let sku = "example-sku"; // Example SKU
    res = http.get(`http://sample_app:8002/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}