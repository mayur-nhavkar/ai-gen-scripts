import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const base_url = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/' } };

    // Health Check
    let res = http.get(`${base_url}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${base_url}/api/v1/cart`, createCartBody, { ...params, headers: { ...params.headers, 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    res = http.get(`${base_url}/api/v1/cart/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    res = http.get(`${base_url}/api/v1/orders/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    res = http.get(`${base_url}/api/v1/products/sample-sku`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Checkout
    const checkoutBody = JSON.stringify({});
    res = http.post(`${base_url}/api/v1/checkout`, checkoutBody, { ...params, headers: { ...params.headers, 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}