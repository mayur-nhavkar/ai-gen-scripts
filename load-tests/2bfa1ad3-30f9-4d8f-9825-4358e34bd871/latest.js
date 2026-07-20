import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const cartCreateBody = JSON.stringify({}); // Adjust as necessary for CartCreate schema
    const checkoutBody = JSON.stringify({}); // Adjust as necessary for CheckoutRequest schema

    const healthzRes = http.get(`${baseUrl}/healthz`);
    check(healthzRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const createCartRes = http.post(`${baseUrl}/api/v1/cart`, cartCreateBody, { tags: { endpoint: '/api/v1/cart' } });
    check(createCartRes, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    const cartId = 1; // Replace with appropriate value
    const getCartRes = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(getCartRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    const userId = 1; // Replace with appropriate value
    const listOrdersRes = http.get(`${baseUrl}/api/v1/orders/${userId}`, { tags: { endpoint: `/api/v1/orders/${userId}` } });
    check(listOrdersRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    const sku = 'product-sku'; // Replace with appropriate value
    const getProductRes = http.get(`${baseUrl}/api/v1/products/${sku}`, { tags: { endpoint: `/api/v1/products/${sku}` } });
    check(getProductRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    const checkoutRes = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, { tags: { endpoint: '/api/v1/checkout' } });
    check(checkoutRes, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}