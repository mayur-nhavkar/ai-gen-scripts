import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // Health Check
    res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    let createCartPayload = { /* Sample payload for CartCreate schema */ };
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Sample cart id
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders
    let userId = 1; // Sample user id
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Product By Sku
    let sku = 'sample-sku'; // Sample SKU
    res = http.get(`http://sample_app:8002/api/v1/products/${sku}`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Checkout
    let checkoutPayload = { /* Sample payload for CheckoutRequest schema */ };
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/checkout' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}