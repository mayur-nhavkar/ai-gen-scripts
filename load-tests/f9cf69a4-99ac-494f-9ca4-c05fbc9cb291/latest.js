import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const cartCreateBody = JSON.stringify({}); // Example body for CartCreate
    const checkoutBody = JSON.stringify({}); // Example body for CheckoutRequest
    const cartId = 1; // Example cart ID
    const userId = 1; // Example user ID
    const sku = 'example_sku'; // Example SKU
    const params = { tags: { endpoint: '/api/v1/cart' } };

    // Health Check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    res = http.post(`${baseUrl}/api/v1/cart`, cartCreateBody, params);
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
  
    // Get Cart
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    // Checkout
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, params);
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
  
    // List Orders
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    // Get Product By Sku
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}