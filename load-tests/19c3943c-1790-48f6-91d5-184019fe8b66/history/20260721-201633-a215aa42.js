import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const headers = { tags: {} };

    // Health check
    let res = http.get(`${baseUrl}/healthz`, { headers });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart (assuming cart_id = 1 for demonstration)
    res = http.get(`${baseUrl}/api/v1/cart/1`, { headers });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Recent Orders
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`, { headers });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Orders By Status (assuming status = 'completed' for demonstration)
    res = http.get(`${baseUrl}/api/v1/orders/by-status/completed`, { headers });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Products By Category (assuming category = 'electronics' for demonstration)
    res = http.get(`${baseUrl}/api/v1/products/by-category/electronics`, { headers });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}