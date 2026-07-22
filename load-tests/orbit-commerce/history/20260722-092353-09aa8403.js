import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: 'order-items-by-product' } };
    
    // GET /api/v1/order-items/by-product/{product_id}
    const productId = 123; // Example product_id
    const res1 = http.get(`${baseUrl}/api/v1/order-items/by-product/${productId}`, params);
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    params.tags.endpoint = 'low-stock';

    // GET /api/v1/products/low-stock
    const res2 = http.get(`${baseUrl}/api/v1/products/low-stock`, params);
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}