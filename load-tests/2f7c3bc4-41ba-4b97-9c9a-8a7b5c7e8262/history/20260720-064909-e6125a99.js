import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // 1. Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 2. Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 3. Get Cart
    const cartId = 1; // Example cart_id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 4. List Orders
    const userId = 1; // Example user_id
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 5. Get Product By Sku
    const sku = 'example-sku'; // Example SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}