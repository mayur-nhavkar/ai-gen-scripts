import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Healthz check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartPayload = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart (example cart_id = 1)
    res = http.get(`${baseUrl}/api/v1/cart/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders (example user_id = 1)
    res = http.get(`${baseUrl}/api/v1/orders/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku (example sku = 'example-sku')
    res = http.get(`${baseUrl}/api/v1/products/example-sku`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}