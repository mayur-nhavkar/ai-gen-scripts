import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const headers = { 'Content-Type': 'application/json' };

    // Health Check
    let res = http.get(`${baseUrl}/healthz`, { headers, tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({ /* parameters as needed */ });
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart (using a sample cart_id)
    const cartId = 1; // Change this to a valid cart_id as needed
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { headers, tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders (using a sample user_id)
    const userId = 1; // Change this to a valid user_id as needed
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, { headers, tags: { endpoint: `/api/v1/orders/${userId}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product by SKU (using a sample sku)
    const sku = 'example-sku'; // Change this to a valid sku as needed
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, { headers, tags: { endpoint: `/api/v1/products/${sku}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}