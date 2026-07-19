import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Healthz endpoint
    let res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart endpoint
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart endpoint
    let cartId = 1; // Example cart_id
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders endpoint
    let userId = 1; // Example user_id
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku endpoint
    let sku = 'example-sku'; // Example SKU
    res = http.get(`http://sample_app:8002/api/v1/products/${sku}`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}