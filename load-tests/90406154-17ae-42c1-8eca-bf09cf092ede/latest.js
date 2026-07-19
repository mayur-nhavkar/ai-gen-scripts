import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // Health Check
    res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartPayload = {
        user_id: 1
    };
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Example cart_id
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    const userId = 1; // Example user_id
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: `/api/v1/orders/${userId}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku
    const sku = 'example-sku'; // Replace with an example sku
    res = http.get(`http://sample_app:8002/api/v1/products/${sku}`, { tags: { endpoint: `/api/v1/products/${sku}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}