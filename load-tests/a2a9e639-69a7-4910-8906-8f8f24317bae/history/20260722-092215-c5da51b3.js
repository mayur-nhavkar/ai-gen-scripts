import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseURL = 'http://sample_app:8002';
    
    // Health check
    let res = http.get(`${baseURL}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    let createCartBody = JSON.stringify({});
    res = http.post(`${baseURL}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart
    let cartId = 1; // Assuming we have a cart ID for the example
    res = http.get(`${baseURL}/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Recent Orders
    let sinceDate = '2023-01-01'; // Example date
    res = http.get(`${baseURL}/api/v1/orders/recent?since=${sinceDate}`, { tags: { endpoint: '/api/v1/orders/recent' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Products by Category
    let category = 'electronics'; // Example category
    res = http.get(`${baseURL}/api/v1/products/by-category/${category}`, { tags: { endpoint: `/api/v1/products/by-category/${category}` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // User Recommendations
    let userId = 1; // Example user ID
    res = http.get(`${baseURL}/api/v1/users/${userId}/recommendations`, { tags: { endpoint: `/api/v1/users/${userId}/recommendations` } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}