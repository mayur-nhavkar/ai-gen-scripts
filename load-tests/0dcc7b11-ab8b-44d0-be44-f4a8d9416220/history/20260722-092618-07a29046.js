import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Create Cart
    const createCartPayload = { /* Sample JSON for CartCreate */ };
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get Cart
    const cartId = 1; // Example cart ID
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Recent Orders
    const sinceDate = '2023-01-01'; // Example date
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Orders By Status
    const status = 'completed'; // Example order status
    res = http.get(`${baseUrl}/api/v1/orders/by-status/${status}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Products By Category
    const category = 'electronics'; // Example category
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}