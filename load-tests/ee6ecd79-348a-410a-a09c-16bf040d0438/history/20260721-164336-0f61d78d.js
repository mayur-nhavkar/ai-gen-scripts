import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Create Cart
    const createCartPayload = {};
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get Cart
    const cartId = 1; // Sample Cart Id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // List Orders
    const userId = 1; // Sample User Id
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Get Product By Sku
    const sku = 'sample-sku'; // Sample SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // Html Search
    const query = 'search-query'; // Sample search query
    res = http.get(`${baseUrl}/search`, { params: { q: query } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}