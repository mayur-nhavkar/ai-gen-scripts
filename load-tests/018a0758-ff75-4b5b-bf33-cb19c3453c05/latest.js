import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health check
    let res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify({}), { 
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    res = http.get('http://sample_app:8002/api/v1/cart/1', { tags: { endpoint: '/api/v1/cart/1' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // List Orders
    res = http.get('http://sample_app:8002/api/v1/orders/1', { tags: { endpoint: '/api/v1/orders/1' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Checkout
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify({}), { 
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/checkout' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Product By Sku
    res = http.get('http://sample_app:8002/api/v1/products/sample_sku', { tags: { endpoint: '/api/v1/products/sample_sku' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}