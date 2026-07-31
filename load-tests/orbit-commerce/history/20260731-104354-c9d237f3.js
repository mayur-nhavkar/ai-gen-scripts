import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/products/{sku}' } };

    // GET /api/v1/products/{sku}
    let res = http.get(`${baseUrl}/api/v1/products/12345`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/products/by-category/{category}
    res = http.get(`${baseUrl}/api/v1/products/by-category/electronics`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/products/low-stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}