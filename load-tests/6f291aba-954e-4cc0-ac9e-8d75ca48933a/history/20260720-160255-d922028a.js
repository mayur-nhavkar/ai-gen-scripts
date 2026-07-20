import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // GET Healthz
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // POST Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // GET Get Cart
    const cartId = 1; // Assuming we have a cart_id of 1
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // GET List Orders
    const userId = 1; // Assuming we are querying for user_id of 1
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // GET Get Product By Sku
    const sku = 'example-sku'; // Replace with a real SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // POST Checkout
    const checkoutBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}