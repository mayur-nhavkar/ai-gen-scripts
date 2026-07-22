import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };
    
    // Healthz
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { ...params, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Placeholder, normally you'd retrieve or create a cart first
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Recent Orders
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2021-01-01`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Carts By User
    const userId = 1; // Placeholder for user ID
    res = http.get(`${baseUrl}/api/v1/carts/by-user/${userId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Products By Category
    const category = 'electronics'; // Example category
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}