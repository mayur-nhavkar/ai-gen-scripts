import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: 'GET /healthz' } };
    
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    params.tags.endpoint = 'POST /api/v1/cart';
    const cartCreateBody = JSON.stringify({ user_id: 1 }); // assuming this is a required field
    res = http.post(`${baseUrl}/api/v1/cart`, cartCreateBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    params.tags.endpoint = 'GET /api/v1/cart/1';
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    params.tags.endpoint = 'GET /api/v1/products/product-123';
    res = http.get(`${baseUrl}/api/v1/products/product-123`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    params.tags.endpoint = 'POST /api/v1/checkout';
    const checkoutBody = JSON.stringify({ cart_id: 1 }); // assuming cart_id is required for checkout
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    params.tags.endpoint = 'GET /api/v1/orders/1';
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}