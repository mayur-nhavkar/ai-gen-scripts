import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '' } };

    // Health Check
    params.tags.endpoint = '/healthz';
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({}); // Placeholder for CartCreate schema
    params.tags.endpoint = '/api/v1/cart';
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart (using a sample cart_id, e.g., 1)
    const cart_id = 1; 
    params.tags.endpoint = `/api/v1/cart/${cart_id}`;
    res = http.get(`${baseUrl}/api/v1/cart/${cart_id}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders (using a sample user_id, e.g., 1)
    const user_id = 1;
    params.tags.endpoint = `/api/v1/orders/${user_id}`;
    res = http.get(`${baseUrl}/api/v1/orders/${user_id}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku (using a sample sku, e.g., 'product-123')
    const sku = 'product-123';
    params.tags.endpoint = `/api/v1/products/${sku}`;
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Checkout (using a sample checkout request body)
    const checkoutBody = JSON.stringify({}); // Placeholder for CheckoutRequest schema
    params.tags.endpoint = '/api/v1/checkout';
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}