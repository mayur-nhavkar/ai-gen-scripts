import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health Check
    let res1 = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartPayload = { user_id: 1 };
    let res2 = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Assuming we created a cart with ID 1
    let res3 = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Checkout
    let checkoutPayload = { cart_id: cartId };
    let res4 = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/checkout' }
    });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    let userId = 1; // Assuming a user ID for fetching orders
    let res5 = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: `/api/v1/orders/${userId}` } });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}