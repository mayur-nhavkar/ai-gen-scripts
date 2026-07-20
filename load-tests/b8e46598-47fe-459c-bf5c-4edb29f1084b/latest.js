import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
  
    // Health check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
  
    // Create Cart
    let createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
  
    // Get Cart
    const cartId = 1; // Replace with a valid cart ID if necessary
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
  
    // List Orders
    const userId = 1; // Replace with a valid user ID if necessary
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
  
    // Get Product By Sku
    const sku = 'example-sku'; // Replace with a valid SKU if necessary
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
  
    // Html Index
    res = http.get(`${baseUrl}/`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}