import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '' } };

    // Health Check
    params.tags.endpoint = '/healthz';
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    params.tags.endpoint = '/api/v1/cart';
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, {
        headers: { 'Content-Type': 'application/json' },
        ...params,
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Assumed cart_id
    params.tags.endpoint = `/api/v1/cart/${cartId}`;
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    const userId = 1; // Assumed user_id
    params.tags.endpoint = `/api/v1/orders/${userId}`;
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku
    const sku = 'sample-sku'; // Assumed SKU
    params.tags.endpoint = `/api/v1/products/${sku}`;
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}