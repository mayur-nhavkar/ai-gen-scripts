import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health Check
    let res1 = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartPayload = { /* Add plausible CartCreate JSON example here */ };
    let res2 = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Replace with a valid cart ID as needed
    let res3 = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    let userId = 1; // Replace with a valid user ID as needed
    let res4 = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    let sku = 'example-sku'; // Replace with a valid SKU as needed
    let res5 = http.get(`http://sample_app:8002/api/v1/products/${sku}`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Checkout
    let checkoutPayload = { /* Add plausible CheckoutRequest JSON example here */ };
    let res6 = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/checkout' }
    });
    check(res6, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}