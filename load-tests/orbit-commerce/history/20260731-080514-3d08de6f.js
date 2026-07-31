import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Endpoint: Get Products by SKU
    const sku = 'example-sku';  // Replace with a valid SKU for testing
    const res1 = http.get(`${baseUrl}/api/v1/products/${sku}`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res1, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Endpoint: Get Cart
    const cartId = 1;  // Replace with a valid cart ID for testing
    const res2 = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res2, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Endpoint: Recent Orders
    const sinceDate = '2023-01-01';  // Replace with a valid date for testing
    const res3 = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`, { tags: { endpoint: '/api/v1/orders/recent' } });
    check(res3, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Endpoint: Products Low Stock
    const res4 = http.get(`${baseUrl}/api/v1/products/low-stock`, { tags: { endpoint: '/api/v1/products/low-stock' } });
    check(res4, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Endpoint: Orders by Status
    const status = 'pending';  // Replace with a valid status for testing
    const res5 = http.get(`${baseUrl}/api/v1/orders/by-status/${status}`, { tags: { endpoint: '/api/v1/orders/by-status/{status}' } });
    check(res5, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}