import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // Health check
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    const cartPayload = { /* CartCreate example fields */ };
    res = http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(cartPayload), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart
    const cartId = 1; // replace with a valid cart_id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Checkout
    const checkoutPayload = { /* CheckoutRequest example fields */ };
    res = http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders
    const userId = 1; // replace with a valid user_id
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Product By Sku
    const sku = 'example-sku'; // replace with a valid sku
    res = http.get(`${baseUrl}/api/v1/products/${sku}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}