import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const healthzRes = http.get(`${baseUrl}/healthz`);
    check(healthzRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const createCartPayload = JSON.stringify({ /* populate with CartCreate schema example */ });
    const createCartRes = http.post(`${baseUrl}/api/v1/cart`, createCartPayload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } });
    check(createCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const cartId = 1; // replace with a valid cart_id
    const getCartRes = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(getCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const recentOrdersRes = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`, { tags: { endpoint: '/api/v1/orders/recent' } });
    check(recentOrdersRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const ordersByStatusRes = http.get(`${baseUrl}/api/v1/orders/by-status/pending`, { tags: { endpoint: '/api/v1/orders/by-status/pending' } });
    check(ordersByStatusRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const productsLowStockRes = http.get(`${baseUrl}/api/v1/products/low-stock`, { tags: { endpoint: '/api/v1/products/low-stock' } });
    check(productsLowStockRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}