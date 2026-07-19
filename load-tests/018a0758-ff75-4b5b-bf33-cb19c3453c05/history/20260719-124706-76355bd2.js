import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // Health Check
    res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    let cartPayload = { /* Payload for CartCreate schema */ };
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(cartPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    res = http.get('http://sample_app:8002/api/v1/cart/1', { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    res = http.get('http://sample_app:8002/api/v1/orders/1', { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product by SKU
    res = http.get('http://sample_app:8002/api/v1/products/ABC123', { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    let checkoutPayload = { /* Payload for CheckoutRequest schema */ };
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/checkout' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}