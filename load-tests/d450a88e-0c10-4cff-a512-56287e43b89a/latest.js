import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health Check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartRes = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify({}));
    check(createCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Example cart_id
    let getCartRes = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(getCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    const userId = 1; // Example user_id
    let listOrdersRes = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(listOrdersRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    const sku = 'example-sku'; // Example SKU
    let getProductRes = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(getProductRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Html Search
    let searchRes = http.get(`${baseUrl}/search?q=example`);
    check(searchRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}