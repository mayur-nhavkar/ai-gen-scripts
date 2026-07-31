import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/products/{sku}' } };

    // Example SKU for testing
    const sku = 'example-sku';

    const res1 = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const res2 = http.get(`${baseUrl}/healthz`, params);
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const category = 'electronics'; // Example category for next request
    const res3 = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, params);
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const res4 = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`, params);
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}