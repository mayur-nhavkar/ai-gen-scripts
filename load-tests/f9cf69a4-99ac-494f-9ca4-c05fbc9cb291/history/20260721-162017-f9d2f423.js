import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // GET request - Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request - Create Cart
    const createCartBody = { /* example JSON for CartCreate schema */ };
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartBody), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // GET request - Get Cart
    const cartId = 1; // assuming a valid cart_id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request - Checkout
    const checkoutBody = { /* example JSON for CheckoutRequest schema */ };
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutBody), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // GET request - List Orders
    const userId = 1; // assuming a valid user_id
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // GET request - Get Product by SKU
    const sku = 'example-sku'; // assuming a valid SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}