import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Representing the sku as an example (replace with actual data)
    const sku = 'example-sku';

    // GET /api/v1/products/{sku}
    let res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/products/low-stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/products/by-category/{category}
    res = http.get(`${baseUrl}/api/v1/products/by-category/electronics`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET /api/v1/orders/recent
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/orders/by-status/{status}
    res = http.get(`${baseUrl}/api/v1/orders/by-status/pending`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}