import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };
    
    // Healthz check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    params.tags.endpoint = '/api/v1/cart';
    const createCartPayload = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartPayload, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get Cart
    params.tags.endpoint = '/api/v1/cart/1';
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    params.tags.endpoint = '/api/v1/orders/1';
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku
    params.tags.endpoint = '/api/v1/products/test-sku';
    res = http.get(`${baseUrl}/api/v1/products/test-sku`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}