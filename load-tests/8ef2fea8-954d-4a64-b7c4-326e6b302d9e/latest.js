import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '' } };

    // Health Check
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, { ...params, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Example Cart Id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    const userId = 1; // Example User Id
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Get Product By Sku
    const sku = 'product123'; // Example Sku
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Html Search
    const searchQuery = 'laptops'; // Example search query
    res = http.get(`${baseUrl}/search?q=${searchQuery}`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}