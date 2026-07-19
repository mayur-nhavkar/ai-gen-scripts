import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health check
    let res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartPayload = JSON.stringify({});
    res = http.post('http://sample_app:8002/api/v1/cart', createCartPayload, { 
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' } 
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart (assuming cart_id is 1 for the example)
    res = http.get('http://sample_app:8002/api/v1/cart/1', { tags: { endpoint: '/api/v1/cart/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders (assuming user_id is 1 for the example)
    res = http.get('http://sample_app:8002/api/v1/orders/1', { tags: { endpoint: '/api/v1/orders/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku (assuming sku is 'abc123' for the example)
    res = http.get('http://sample_app:8002/api/v1/products/abc123', { tags: { endpoint: '/api/v1/products/abc123' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}