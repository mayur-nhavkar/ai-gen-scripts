import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/products/by-category' } };

    // Get products by category
    let res = http.get(`${baseUrl}/api/v1/products/by-category/electronics`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get products low stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get a product by SKU
    res = http.get(`${baseUrl}/api/v1/products/12345`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get recent orders
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get orders by status
    res = http.get(`${baseUrl}/api/v1/orders/by-status/pending`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get user recommendations
    res = http.get(`${baseUrl}/api/v1/users/1/recommendations`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}