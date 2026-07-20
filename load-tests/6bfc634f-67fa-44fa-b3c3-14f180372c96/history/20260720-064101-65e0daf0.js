import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    let payloadCreateCart = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, payloadCreateCart, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart (Assuming cart_id = 1)
    res = http.get(`${baseUrl}/api/v1/cart/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Checkout
    let payloadCheckout = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/checkout`, payloadCheckout, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders (Assuming user_id = 1)
    res = http.get(`${baseUrl}/api/v1/orders/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Product By Sku (Assuming sku = 'example-sku')
    res = http.get(`${baseUrl}/api/v1/products/example-sku`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}