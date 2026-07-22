import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '' } };

    // Endpoint: /api/v1/order-items/by-product/{product_id}
    const productId = 1; // Example product_id
    params.tags.endpoint = '/api/v1/order-items/by-product/' + productId;
    let res = http.get(`${baseUrl}/api/v1/order-items/by-product/${productId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Endpoint: /api/v1/products/low-stock
    params.tags.endpoint = '/api/v1/products/low-stock';
    res = http.get(`${baseUrl}/api/v1/products/low-stock`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}