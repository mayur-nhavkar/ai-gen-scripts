import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart (assuming cart_id is 1)
    res = http.get(`${baseUrl}/api/v1/cart/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Recent Orders
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Carts By User (assuming user_id is 1)
    res = http.get(`${baseUrl}/api/v1/carts/by-user/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Products Low Stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}