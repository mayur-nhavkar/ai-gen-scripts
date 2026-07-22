import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({ /* populated with example schema data */ });
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get Cart
    const cartId = 1; // assumed cart ID for example
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Recent Orders
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Products by Category
    const category = 'electronics'; // assumed category for example
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // User Order Summary
    const userId = 1; // assumed user ID for example
    res = http.get(`${baseUrl}/api/v1/users/${userId}/order-summary`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}