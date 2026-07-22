import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health check
    const res1 = http.get(`${baseUrl}/healthz`, { tags: { endpoint: '/healthz' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    const createCartBody = JSON.stringify({});
    const res2 = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { tags: { endpoint: '/api/v1/cart' }, headers: { 'Content-Type': 'application/json' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart (example cart_id=1)
    const res3 = http.get(`${baseUrl}/api/v1/cart/1`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Checkout
    const checkoutBody = JSON.stringify({});
    const res4 = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { tags: { endpoint: '/api/v1/checkout' }, headers: { 'Content-Type': 'application/json' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Recent Orders
    const res5 = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`, { tags: { endpoint: '/api/v1/orders/recent' } });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Products Low Stock
    const res6 = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`, { tags: { endpoint: '/api/v1/products/low-stock' } });
    check(res6, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}