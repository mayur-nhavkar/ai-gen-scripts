import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/' } };

    // Health Check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartPayload = {
        // Assuming a basic structure for CartCreate based on context
        items: []
    };
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart - using a placeholder cart_id
    const cartId = 1; // Set an appropriate cart_id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Recent Orders
    const sinceDate = '2023-01-01'; // Set an appropriate date
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Products By Category - using a placeholder category
    const category = 'electronics'; // Set an appropriate category
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // User Recommendations - using a placeholder user_id
    const userId = 1; // Set an appropriate user_id
    res = http.get(`${baseUrl}/api/v1/users/${userId}/recommendations`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}