import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health check
    let res1 = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartPayload = JSON.stringify({});
    let res2 = http.post('http://sample_app:8002/api/v1/cart', createCartPayload, { tags: { endpoint: '/api/v1/cart' }, headers: { 'Content-Type': 'application/json' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Example cart_id to retrieve
    let res3 = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    let userId = 1; // Example user_id to list orders
    let res4 = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    let sku = '12345'; // Example SKU
    let res5 = http.get(`http://sample_app:8002/api/v1/products/${sku}`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}