import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // 1. Health Check
    res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // 2. Create Cart
    const createCartPayload = {};
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), 
                    { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // 3. Get Cart
    const cartId = 1; // assuming a cart ID for demonstration
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // 4. List Orders
    const userId = 1; // assuming a user ID for demonstration
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: `/api/v1/orders/${userId}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // 5. Get Product By Sku
    const sku = "example-sku"; // assuming a product SKU for demonstration
    res = http.get(`http://sample_app:8002/api/v1/products/${sku}`, { tags: { endpoint: `/api/v1/products/${sku}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // 6. Checkout
    const checkoutPayload = {};
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), 
                    { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/checkout' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}