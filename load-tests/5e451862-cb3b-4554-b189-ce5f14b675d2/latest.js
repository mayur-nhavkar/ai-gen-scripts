import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({}); // Assuming an empty body for creation
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    res = http.get(`${baseUrl}/api/v1/cart/1`); // Assuming cart_id = 1 for testing
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Recent Orders
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`); // Assuming a specific date for testing
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // User Recommendations
    res = http.get(`${baseUrl}/api/v1/users/1/recommendations`); // Assuming user_id = 1 for testing
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Products Low Stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`); // Assuming a threshold query parameter
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}