import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // Health Check
    res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify({
        product_id: 1,
        user_id: 1
    }), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    res = http.get('http://sample_app:8002/api/v1/cart/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    res = http.get('http://sample_app:8002/api/v1/orders/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By SKU
    res = http.get('http://sample_app:8002/api/v1/products/example-sku');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify({
        cart_id: 1,
        user_id: 1
    }), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}