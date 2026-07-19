import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health Check
    let res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    let createCartPayload = {
        // Assuming CartCreate schema example
        user_id: 1
    };
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart (assuming cart ID is 1 for the example)
    res = http.get('http://sample_app:8002/api/v1/cart/1', { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    let checkoutPayload = {
        // Assuming CheckoutRequest schema example
        cart_id: 1,
        user_id: 1
    };
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/checkout' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // List Orders (assuming user ID is 1)
    res = http.get('http://sample_app:8002/api/v1/orders/1', { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product by SKU (assuming SKU is 'example-sku')
    res = http.get('http://sample_app:8002/api/v1/products/example-sku', { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}