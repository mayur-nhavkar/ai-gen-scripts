import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // Health check
    res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    const createCartPayload = { user_id: 1 };
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart
    const cartId = 1; // Assuming a cart ID for demonstration
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders
    const userId = 1; // Assuming a user ID for demonstration
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku
    const sku = 'product-sku'; // Assuming a product SKU for demonstration
    res = http.get(`http://sample_app:8002/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}