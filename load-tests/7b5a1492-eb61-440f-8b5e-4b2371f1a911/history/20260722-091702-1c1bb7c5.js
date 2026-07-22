import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };

    // Healthz Check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({ /* Add representative fields from CartCreate schema */ });
    params.tags.endpoint = '/api/v1/cart';
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Replace with a valid cart ID for testing
    params.tags.endpoint = `/api/v1/cart/${cartId}`;
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Recent Orders
    const sinceDate = '2023-01-01'; // Example date
    params.tags.endpoint = '/api/v1/orders/recent';
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Products by Category
    const category = 'electronics'; // Example category
    params.tags.endpoint = `/api/v1/products/by-category/${category}`;
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // User Order Summary
    const userId = 1; // Example user ID
    params.tags.endpoint = `/api/v1/users/${userId}/order-summary`;
    res = http.get(`${baseUrl}/api/v1/users/${userId}/order-summary`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}