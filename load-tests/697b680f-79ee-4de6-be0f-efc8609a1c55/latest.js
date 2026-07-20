import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const createCartPayload = JSON.stringify({
        // Assuming the schema for CartCreate is empty
    });
    const checkoutPayload = JSON.stringify({
        // Assuming the schema for CheckoutRequest is empty
    });
    const cartId = 1; // Example cart ID
    const userId = 1; // Example user ID
    const sku = "example-sku"; // Example SKU

    // Health Check
    let res = http.get(`${baseUrl}/healthz`, { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Create Cart
    res = http.post(`${baseUrl}/api/v1/cart`, createCartPayload, { tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, { tags: { endpoint: `/api/v1/cart/${cartId}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // List Orders
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, { tags: { endpoint: `/api/v1/orders/${userId}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Get Product By SKU
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, { tags: { endpoint: `/api/v1/products/${sku}` } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutPayload, { tags: { endpoint: '/api/v1/checkout' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}