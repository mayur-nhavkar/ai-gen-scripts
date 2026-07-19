import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health check
    let res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    let cartRes = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify({}), { 
        headers: { 'Content-Type': 'application/json' }, 
        tags: { endpoint: '/api/v1/cart' }
    });
    check(cartRes, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Assuming a cart ID for the example
    let cartGetRes = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, { tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    check(cartGetRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    let userId = 1; // Assuming a user ID for the example
    let ordersRes = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, { tags: { endpoint: '/api/v1/orders/{user_id}' } });
    check(ordersRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By Sku
    let sku = 'example-sku'; // Assuming a SKU for the example
    let productRes = http.get(`http://sample_app:8002/api/v1/products/${sku}`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(productRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}