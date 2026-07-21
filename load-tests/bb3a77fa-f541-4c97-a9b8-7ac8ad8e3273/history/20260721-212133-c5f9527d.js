import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };

    // Health Check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({ /* sample CartCreate payload */ });
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Example cart_id
    params.tags.endpoint = `/api/v1/cart/${cartId}`;
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Recent Orders
    const since = '2023-01-01'; // Example date
    params.tags.endpoint = '/api/v1/orders/recent';
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${since}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Products Low Stock
    params.tags.endpoint = '/api/v1/products/low-stock';
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // User Order Summary
    const userId = 1; // Example user_id
    params.tags.endpoint = `/api/v1/users/${userId}/order-summary`;
    res = http.get(`${baseUrl}/api/v1/users/${userId}/order-summary`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}