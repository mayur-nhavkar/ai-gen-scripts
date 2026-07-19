import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health Check
    let res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    res = http.post('http://sample_app:8002/api/v1/cart', 
        JSON.stringify({ user_id: 1 }), 
        { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    res = http.get('http://sample_app:8002/api/v1/cart/1', { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    res = http.get('http://sample_app:8002/api/v1/orders/1', { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product by SKU
    res = http.get('http://sample_app:8002/api/v1/products/sample-sku', { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Checkout
    res = http.post('http://sample_app:8002/api/v1/checkout', 
        JSON.stringify({ cart_id: 1, user_id: 1 }), 
        { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/checkout' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}