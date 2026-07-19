import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health Check
    let res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify({ items: [] }), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart (assuming cart_id is 1)
    res = http.get('http://sample_app:8002/api/v1/cart/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders (assuming user_id is 1)
    res = http.get('http://sample_app:8002/api/v1/orders/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku (assuming sku is 'sample-sku')
    res = http.get('http://sample_app:8002/api/v1/products/sample-sku');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Perform Checkout
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify({ cart_id: 1 }), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}