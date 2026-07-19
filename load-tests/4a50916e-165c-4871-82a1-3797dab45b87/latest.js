import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Healthz check
    let res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartBody = JSON.stringify({});
    res = http.post('http://sample_app:8002/api/v1/cart', createCartBody, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart (assuming a cart_id of 1)
    res = http.get('http://sample_app:8002/api/v1/cart/1', { tags: { endpoint: '/api/v1/cart/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders (assuming a user_id of 1)
    res = http.get('http://sample_app:8002/api/v1/orders/1', { tags: { endpoint: '/api/v1/orders/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku (assuming a sku of "example-sku")
    res = http.get('http://sample_app:8002/api/v1/products/example-sku', { tags: { endpoint: '/api/v1/products/example-sku' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}