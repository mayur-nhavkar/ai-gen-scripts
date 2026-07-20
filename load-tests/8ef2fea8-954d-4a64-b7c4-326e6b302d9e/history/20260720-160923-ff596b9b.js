import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '' } };

    // Health check
    params.tags.endpoint = '/healthz';
    const res1 = http.get(`${baseUrl}/healthz`, params);
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    params.tags.endpoint = '/api/v1/cart';
    const cartPayload = { user_id: 1 };
    const res2 = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(cartPayload), { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Assuming a cart_id of 1 for this example
    params.tags.endpoint = `/api/v1/cart/${cartId}`;
    const res3 = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    const userId = 1; // Assuming a user_id of 1 for this example
    params.tags.endpoint = `/api/v1/orders/${userId}`;
    const res4 = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    const sku = 'ABC123'; // Assuming a SKU for this example
    params.tags.endpoint = `/api/v1/products/${sku}`;
    const res5 = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}