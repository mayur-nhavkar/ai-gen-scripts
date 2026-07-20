import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '' } };

    // Healthz endpoint
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart endpoint
    const createCartBody = JSON.stringify({});
    params.tags.endpoint = '/api/v1/cart';
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart endpoint
    const cartId = 1; // Example cart ID
    params.tags.endpoint = `/api/v1/cart/${cartId}`;
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders endpoint
    const userId = 1; // Example user ID
    params.tags.endpoint = `/api/v1/orders/${userId}`;
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku endpoint
    const sku = 'example-sku'; // Example SKU
    params.tags.endpoint = `/api/v1/products/${sku}`;
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}