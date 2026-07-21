import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    params.tags.endpoint = '/api/v1/cart';
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart
    params.tags.endpoint = '/api/v1/cart/1';
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders
    params.tags.endpoint = '/api/v1/orders/1';
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    params.tags.endpoint = '/api/v1/products/sample-sku';
    res = http.get(`${baseUrl}/api/v1/products/sample-sku`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Html Index
    params.tags.endpoint = '/';
    res = http.get(`${baseUrl}/`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}