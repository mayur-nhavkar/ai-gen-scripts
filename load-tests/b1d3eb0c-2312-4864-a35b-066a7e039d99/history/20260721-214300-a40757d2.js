import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const healthzRes = http.get(`${baseUrl}/healthz`);
    check(healthzRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const createCartBody = JSON.stringify({});
    const createCartRes = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(createCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const cartId = 1; // Example cart ID
    const getCartRes = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(getCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const recentOrdersRes = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`);
    check(recentOrdersRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const status = 'completed'; // Example status
    const ordersByStatusRes = http.get(`${baseUrl}/api/v1/orders/by-status/${status}`);
    check(ordersByStatusRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const productId = 123; // Example product ID
    const orderItemsByProductRes = http.get(`${baseUrl}/api/v1/order-items/by-product/${productId}`);
    check(orderItemsByProductRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}