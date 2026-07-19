import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // 1. Health Check
    let res = http.get(`${baseUrl}/healthz`, { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 2. Create Cart
    const createCartPayload = {
        // Assume required fields for CartCreate schema
        user_id: 1
    };
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 3. Get Cart
    const cartId = 1; // Assuming a cart ID
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 4. List Orders
    const userId = 1; // Assuming a user ID
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, { tags: { endpoint: `/api/v1/orders/${userId}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 5. Get Product By Sku
    const sku = 'example-sku'; // Assuming a SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, { tags: { endpoint: `/api/v1/products/${sku}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // 6. Checkout
    const checkoutPayload = {
        // Assume required fields for CheckoutRequest schema
        cart_id: cartId,
        user_id: userId
    };
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/checkout' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}