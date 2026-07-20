import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/cart' } };
    
    // Health check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, {
        ...params,
        headers: { 'Content-Type': 'application/json', ...params.headers }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get Cart (assuming cart_id = 1)
    params.tags.endpoint = '/api/v1/cart/1';
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // List Orders (assuming user_id = 1)
    params.tags.endpoint = '/api/v1/orders/1';
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Get Product By Sku (assuming sku = '123456')
    params.tags.endpoint = '/api/v1/products/123456';
    res = http.get(`${baseUrl}/api/v1/products/123456`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Checkout (assuming a checkout request body is provided)
    const checkoutBody = JSON.stringify({});
    params.tags.endpoint = '/api/v1/checkout';
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, {
        ...params,
        headers: { 'Content-Type': 'application/json', ...params.headers }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
}