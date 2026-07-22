import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Endpoint: /api/v1/order-items/by-product/{product_id}
    const productId = 1; // Example product_id
    const resOrderItems = http.get(`${baseUrl}/api/v1/order-items/by-product/${productId}`, {
        tags: { endpoint: '/api/v1/order-items/by-product/{product_id}' }
    });
    check(resOrderItems, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Endpoint: /api/v1/products/low-stock
    const resLowStock = http.get(`${baseUrl}/api/v1/products/low-stock`, {
        tags: { endpoint: '/api/v1/products/low-stock' }
    });
    check(resLowStock, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}