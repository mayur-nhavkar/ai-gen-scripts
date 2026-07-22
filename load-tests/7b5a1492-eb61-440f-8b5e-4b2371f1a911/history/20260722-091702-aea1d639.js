import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    let createCartPayload = { /* Add sample fields based on CartCreate schema */ };
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart
    const cartId = 1; // Use a valid cart ID
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Recent Orders
    const sinceDate = '2023-01-01'; // Adjust as needed
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Carts By User
    const userId = 1; // Use a valid user ID
    res = http.get(`${baseUrl}/api/v1/carts/by-user/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Products Low Stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}