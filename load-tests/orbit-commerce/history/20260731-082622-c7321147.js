import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/products/{sku}' } };

    // Example GET request for a specific product
    const sku = '12345'; // replace with a valid SKU
    let res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Example GET request for products by category
    const category = 'electronics'; // replace with a valid category
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Example GET request for low stock products
    const threshold = 10;
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=${threshold}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}