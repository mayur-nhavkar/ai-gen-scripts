import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // GET Health Check
    let res = http.get(`${baseUrl}/healthz`, { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST Create Cart
    const createCartBody = JSON.stringify({/* example CartCreate body */});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { tags: { endpoint: '/api/v1/cart' }, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET Cart by ID
    const cartId = 1; // Example cart_id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET Recent Orders
    const sinceDate = '2023-01-01'; // Example since date
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`, { tags: { endpoint: '/api/v1/orders/recent' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET Products by Category
    const category = 'electronics'; // Example category
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, { tags: { endpoint: '/api/v1/products/by-category/{category}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}