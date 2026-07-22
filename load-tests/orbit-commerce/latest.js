import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/order-items/by-product/{product_id}' } };

    // Get order items by product
    let productId = 1; // Example product_id
    let res = http.get(`${baseUrl}/api/v1/order-items/by-product/${productId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Low-stock products
    params.tags.endpoint = '/api/v1/products/low-stock';
    res = http.get(`${baseUrl}/api/v1/products/low-stock`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // You can add additional requests below if needed,
    // such as potential scenarios for /api/v1/cart or other endpoints if required.
}