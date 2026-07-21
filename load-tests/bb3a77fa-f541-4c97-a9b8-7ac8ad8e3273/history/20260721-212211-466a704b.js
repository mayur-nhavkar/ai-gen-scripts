import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const healthzResponse = http.get(`${baseUrl}/healthz`);
    check(healthzResponse, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    const createCartBody = JSON.stringify({ /* populate with appropriate CartCreate schema example */ });
    const createCartResponse = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { headers: { 'Content-Type': 'application/json' } });
    check(createCartResponse, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    const cartId = 1; // Use a valid cart_id based on your context
    const getCartResponse = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(getCartResponse, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    const recentOrdersResponse = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`);
    check(recentOrdersResponse, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    const orderStatus = 'completed'; // Use a valid status based on your context
    const ordersByStatusResponse = http.get(`${baseUrl}/api/v1/orders/by-status/${orderStatus}`);
    check(ordersByStatusResponse, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    const userId = 1; // Use a valid user_id based on your context
    const userOrderSummaryResponse = http.get(`${baseUrl}/api/v1/users/${userId}/order-summary`);
    check(userOrderSummaryResponse, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}