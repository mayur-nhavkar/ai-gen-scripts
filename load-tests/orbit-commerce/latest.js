import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const sku = 'example-sku';
    
    // GET /api/v1/products/{sku}
    let res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET /api/v1/products/low-stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET /api/v1/products/by-category/{category}
    const category = 'electronics';
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET /api/v1/orders/recent
    const since = '2023-01-01';
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${since}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET /api/v1/orders/by-status/{status}
    const status = 'completed';
    res = http.get(`${baseUrl}/api/v1/orders/by-status/${status}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}