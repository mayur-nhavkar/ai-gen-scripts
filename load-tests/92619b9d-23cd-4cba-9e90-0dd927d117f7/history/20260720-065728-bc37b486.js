import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // GET Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': r => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // POST Create Cart
    const createCartPayload = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': r => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET Get Cart
    res = http.get(`${baseUrl}/api/v1/cart/1`);
    check(res, { 'status is 2xx': r => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET List Orders
    res = http.get(`${baseUrl}/api/v1/orders/1`);
    check(res, { 'status is 2xx': r => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET Get Product By Sku
    res = http.get(`${baseUrl}/api/v1/products/sample-sku`);
    check(res, { 'status is 2xx': r => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // POST Checkout
    const checkoutPayload = {};
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': r => r.status >= 200 && r.status < 300 });
    sleep(1);
}